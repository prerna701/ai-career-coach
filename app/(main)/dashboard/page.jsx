// import { getUserOnboardingStatus } from "@/actions/user";
// import { getUserIdFromCookies } from "@/lib/auth";
// import prisma from "@/lib/prisma";
// import { redirect } from "next/navigation";
// import DashboardClient from "./dashboard-client";

// const DashboardPage = async () => {
//    // 2. Get logged-in user
//   const userId = await getUserIdFromCookies();
//   if (!userId) {
//     redirect("/login");
//   }

//   // 1. Check if user is onboarded
//   const { isOnboarded } = await getUserOnboardingStatus();
//   if (!isOnboarded) {
//     redirect("/onboarding");
//   }

 
//   const user = await prisma.user.findUnique({
//     where: { id: userId },
//     select: { id: true, name: true, isAccountVerified: true },
//   });

//   if (!user) {
//     redirect("/login");
//   }

//   // 3. Pass user down to client component
//   return <DashboardClient user={user} />;
// };

// export default DashboardPage;
import { getIndustryInsights } from "@/actions/dashboard";
import DashboardView from "./_components/dashboard-view";
import ToolsOverview from "./_components/tools-overview";
import { getUserOnboardingStatus, getUserProfile } from "@/actions/user";
import { getResume } from "@/actions/resume";
import { getCoverLetters } from "@/actions/cover-letter";
import { getAssessments } from "@/actions/interview";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { isOnboarded } = await getUserOnboardingStatus();

  // If not onboarded, redirect to onboarding page
  // Skip this check if already on the onboarding page
  if (!isOnboarded) {
    redirect("/onboarding");
  }

  const [insights, profile, resume, coverLetters, assessments] = await Promise.all([
    getIndustryInsights(),
    getUserProfile(),
    getResume(),
    getCoverLetters(),
    getAssessments(),
  ]);

  return (
    <div className="container mx-auto space-y-6">
      <ToolsOverview
        resume={resume}
        coverLetters={coverLetters}
        assessments={assessments}
        profile={profile}
      />
      <DashboardView insights={insights} />
    </div>
  );
}