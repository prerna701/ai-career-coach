// Unified text-generation entrypoint with automatic provider fallback.
//
// Order: Gemini (primary, retried on transient failures) -> Groq (free,
// no billing required -- get a key at console.groq.com) -> OpenAI (optional,
// only used if you add a paid OPENAI_API_KEY later).
//
// To add another provider, add one object to `providers` below with the
// same { name, enabled, generate(prompt) } shape.
import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";
import { generateWithRetry } from "./ai-retry";

const geminiModel = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY).getGenerativeModel({ model: "gemini-flash-latest" })
  : null;

// Groq's API is OpenAI-compatible, so the official `openai` SDK works against
// it directly -- just point baseURL at Groq and use a Groq key.
const groqClient = process.env.GROQ_API_KEY
  ? new OpenAI({ apiKey: process.env.GROQ_API_KEY, baseURL: "https://api.groq.com/openai/v1" })
  : null;

const openaiClient = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

async function generateWithChatCompletion(client, model, prompt) {
  const completion = await client.chat.completions.create({
    model,
    messages: [{ role: "user", content: prompt }],
  });
  return completion.choices[0]?.message?.content || "";
}

const providers = [
  {
    name: "Gemini",
    enabled: !!geminiModel,
    generate: async (prompt) => {
      const result = await generateWithRetry(geminiModel, prompt);
      return result.response.text();
    },
  },
  {
    name: "Groq",
    enabled: !!groqClient,
    generate: (prompt) => generateWithChatCompletion(groqClient, "llama-3.3-70b-versatile", prompt),
  },
  {
    name: "OpenAI",
    enabled: !!openaiClient,
    generate: (prompt) => generateWithChatCompletion(openaiClient, "gpt-4o-mini", prompt),
  },
];

/**
 * Generates text from a prompt, trying each configured provider in order
 * until one succeeds. Throws only if every configured provider fails (or
 * none are configured at all).
 */
export async function generateText(prompt) {
  const errors = [];

  for (const provider of providers) {
    if (!provider.enabled) continue;
    try {
      return await provider.generate(prompt);
    } catch (error) {
      console.error(`${provider.name} generation failed:`, error.message);
      errors.push(`${provider.name}: ${error.message}`);
    }
  }

  if (errors.length === 0) {
    throw new Error(
      "No AI provider configured. Set GEMINI_API_KEY and/or GROQ_API_KEY in .env"
    );
  }
  throw new Error(`All AI providers failed: ${errors.join(" | ")}`);
}
