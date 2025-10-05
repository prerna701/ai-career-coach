import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";   // ✅ Missing import
import { generateIndustryInsights, helloWorld } from "@/lib/inngest/function";


// Create an API that serves your functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    generateIndustryInsights
  ],
});
