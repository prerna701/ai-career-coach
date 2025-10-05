import { Inngest } from "inngest";

// Always pull API keys from process.env
export const inngest = new Inngest({
  id: "career-coach",
  name: "career coach",
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY, 
    },
  },
});
