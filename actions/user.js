"use server";

import prisma from "@/lib/prisma";  // ✅ you exported default in prisma.js, so no curly braces
import { getUserIdFromCookies } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { generateAIInsights } from "./dashboard";

export async function updateUser(data) {
  const userId = await getUserIdFromCookies();
  if (!userId) throw new Error("Unauthorized");

  try {
    const result = await prisma.$transaction(
      async (tx) => {
        // First check if industry exists
        let industryInsight = await tx.industryInsight.findUnique({
          where: {
            industry: data.industry,
          },
        });

        // If industry doesn't exist, create it with default values
        if (!industryInsight) {
          const insights = await generateAIInsights(data.industry);

          industryInsight = await tx.industryInsight.create({
            data: {
              industry: data.industry,
              ...insights,
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
          });
        }

        // Now update the user, repointing them at the insight row for the
        // (possibly new) industry so the dashboard doesn't keep showing stale data.
        const updatedUser = await tx.user.update({
          where: { id: userId },
          data: {
            industry: data.industry,
            experience: data.experience,
            bio: data.bio,
            skills: data.skills,
            industryInsightId: industryInsight.id,
          },
        });

        return { updatedUser, industryInsight };
      },
      { timeout: 10000 }
    );

    revalidatePath("/");
    return result.updatedUser; // ✅ fixed
  } catch (error) {
    console.error("Error updating user and industry:", error.message);
    throw new Error("Failed to update profile");
  }
}

export async function getUserProfile() {
  const userId = await getUserIdFromCookies();
  if (!userId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { industry: true, experience: true, skills: true, bio: true },
  });

  return user;
}

export async function getUserOnboardingStatus() {
  const userId = await getUserIdFromCookies();
  if (!userId) throw new Error("Unauthorized");

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { industry: true },
    });

    return {
      isOnboarded: !!user?.industry,
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    throw new Error("Failed to check onboarding status");
  }
}
