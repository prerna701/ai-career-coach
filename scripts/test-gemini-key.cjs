require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const candidates = [
  "gemini-1.5-flash-latest",
  "gemini-1.5-flash",
  "gemini-2.0-flash",
  "gemini-2.5-flash",
  "gemini-flash-latest",
];

async function main() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  for (const modelName of candidates) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Say the word OK.");
      console.log(modelName, "-> SUCCESS:", result.response.text());
    } catch (err) {
      console.log(modelName, "-> FAILED:", err.status || "", err.message.slice(0, 150));
    }
  }
}

main();
