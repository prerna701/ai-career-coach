// "use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getUserIdFromCookies } from "@/lib/auth";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Google Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Normalize AI enums to Prisma enums
function normalizeInsights(insights) {
  return {
    ...insights,
    demandLevel: insights.demandLevel?.toUpperCase(),
    marketOutlook: insights.marketOutlook?.toUpperCase(),
  };
}

// Generate AI insights for an industry
export const generateAIInsights = async (industry) => {
  const prompt = `
    Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format:
    {
      "salaryRanges": [
        { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
      ],
      "growthRate": number,
      "demandLevel": "HIGH" | "MEDIUM" | "LOW",
      "topSkills": ["skill1", "skill2"],
      "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
      "keyTrends": ["trend1", "trend2"],
      "recommendedSkills": ["skill1", "skill2"]
    }
    IMPORTANT: Return ONLY the JSON. Use EXACT enum words.
    Include at least 5 roles, 5 skills, 5 trends. Growth rate is a number.
  `;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

  try {
    const parsed = JSON.parse(cleanedText);
    if (!parsed || !Array.isArray(parsed.salaryRanges) || typeof parsed.growthRate !== "number") {
      throw new Error("AI returned invalid insights shape");
    }
    return parsed;
  } catch (err) {
    console.error("Failed to parse AI response as JSON:", cleanedText, err);
    throw new Error("Failed to parse AI insights");
  }
};

// Main function to get industry insights for logged-in user
export async function getIndustryInsights() {
  const userId = await getUserIdFromCookies();
  if (!userId) redirect("/login");

  // Fetch the user along with any existing industry insight
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { industryInsight: true },
  });

  if (!user) throw new Error("User not found");
  if (!user.industry) throw new Error("User has no industry selected");

  // If user already has industry insights, return them
  if (user.industryInsight) return user.industryInsight;

  // Check if the IndustryInsight already exists
  let industryInsight = await prisma.industryInsight.findUnique({
    where: { industry: user.industry },
  });

  if (!industryInsight) {
    // Generate new AI insights
    const rawInsights = await generateAIInsights(user.industry);
    const insights = normalizeInsights(rawInsights);

    // Create new IndustryInsight and connect the user
    industryInsight = await prisma.industryInsight.create({
      data: {
        industry: user.industry,
        ...insights,
        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        users: {
          connect: [{ id: user.id }],
        },
      },
    });
  } else {
    // IndustryInsight exists, connect the user if not already connected
    await prisma.industryInsight.update({
      where: { industry: user.industry },
      data: {
        users: {
          connect: [{ id: user.id }],
        },
      },
    });
  }

  return industryInsight;
}
