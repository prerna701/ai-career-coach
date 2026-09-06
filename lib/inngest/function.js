import prisma from "@/lib/prisma";
import { inngest } from "./client";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

export const generateIndustryInsights = inngest.createFunction(
  { name: "Generate Industry Insights" },
  { cron: "0 0 * * 0" }, // Run every Sunday at midnight
  async ({ event, step }) => {
    // Step 1: Fetch industries from DB
    const industries = await step.run("Fetch industries", async () => {
      return await prisma.industryInsight.findMany({
        select: { industry: true },
      });
    });

    console.log("Industries fetched:", industries);

    // Step 2: Process each industry
    for (const { industry } of industries) {
      console.log("Processing industry:", industry);

      const prompt = `
        Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
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

        IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
        Include at least 5 common roles for salary ranges.
        Growth rate should be a percentage.
        Include at least 5 skills and trends.
      `;

      // Step 2a: Call Gemini AI
      const res = await step.ai.wrap(
        "gemini",
        async (p) => {
          return await model.generateContent(p);
        },
        prompt
      );

      console.log("Gemini response:", res.response);

      // Step 2b: Clean AI output
      const text =
        res.response.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
      console.log("Cleaned JSON text:", cleanedText);

      // Step 2c: Parse JSON
      let insights;
      try {
        insights = JSON.parse(cleanedText);
      } catch (err) {
        console.error(`Error parsing JSON for ${industry}:`, err);
        continue; // Skip this industry if JSON invalid
      }
      console.log("Parsed insights:", insights);

      // Step 3: Update DB
      await step.run(`Update ${industry} insights`, async () => {
        await prisma.industryInsight.update({
          where: { industry },
          data: {
            ...insights,
            lastUpdated: new Date(),
            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        });
      });
    }

    // Optional: return summary of processed industries
    return {
      processedIndustries: industries.map(({ industry }) => industry),
    };
  }
);
