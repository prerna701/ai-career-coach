require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const prisma = new PrismaClient();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

const industry = process.argv[2] || "Software Engineering";

async function main() {
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
  const text = result.response.text().replace(/```(?:json)?\n?/g, "").trim();
  const insights = JSON.parse(text);
  insights.demandLevel = insights.demandLevel?.toUpperCase();
  insights.marketOutlook = insights.marketOutlook?.toUpperCase();

  const updated = await prisma.industryInsight.update({
    where: { industry },
    data: {
      ...insights,
      lastUpdated: new Date(),
      nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  console.log(`Refreshed "${industry}" with real AI insights:`);
  console.log(JSON.stringify(updated, null, 2));
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
