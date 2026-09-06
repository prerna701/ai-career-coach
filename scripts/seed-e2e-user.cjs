// One-off seed script for E2E testing. Creates a verified user with onboarding
// already complete, bypassing the broken email-OTP registration/login flow.
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const EMAIL = "e2e-test@example.com";
const PASSWORD = "TestPassword123!";
const INDUSTRY = "Software Engineering";

async function main() {
  const passwordHash = await bcrypt.hash(PASSWORD, 10);

  let industryInsight = await prisma.industryInsight.findUnique({ where: { industry: INDUSTRY } });
  if (!industryInsight) {
    industryInsight = await prisma.industryInsight.create({
      data: {
        industry: INDUSTRY,
        salaryRanges: [{ role: "Software Engineer", min: 80000, max: 160000, median: 120000, location: "US" }],
        growthRate: 10,
        demandLevel: "HIGH",
        topSkills: ["JavaScript", "React", "Node.js"],
        marketOutlook: "POSITIVE",
        keyTrends: ["AI adoption"],
        recommendedSkills: ["System design"],
        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
  }

  const user = await prisma.user.upsert({
    where: { email: EMAIL },
    update: {
      password: passwordHash,
      isAccountVerified: true,
      industry: INDUSTRY,
      experience: 5,
      skills: ["JavaScript", "React", "Node.js"],
      bio: "E2E test account",
      industryInsightId: industryInsight.id,
    },
    create: {
      name: "E2E Test User",
      email: EMAIL,
      password: passwordHash,
      isAccountVerified: true,
      industry: INDUSTRY,
      experience: 5,
      skills: ["JavaScript", "React", "Node.js"],
      bio: "E2E test account",
      industryInsightId: industryInsight.id,
    },
  });

  console.log(JSON.stringify({ id: user.id, email: user.email }));
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
