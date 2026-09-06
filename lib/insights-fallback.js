// Generic, domain-agnostic industry insight used only when every AI provider
// fails (outage, exhausted quota, bad response). Keeps onboarding/dashboard
// from ever hard-failing just because the AI couldn't be reached -- matches
// the exact shape (and Prisma enum values) generateAIInsights() normally returns.
export function getFallbackInsights() {
  return {
    salaryRanges: [
      { role: "Entry Level", min: 40000, max: 65000, median: 52000, location: "Varies by region" },
      { role: "Mid Level", min: 65000, max: 95000, median: 80000, location: "Varies by region" },
      { role: "Senior Level", min: 95000, max: 140000, median: 115000, location: "Varies by region" },
      { role: "Lead / Manager", min: 120000, max: 170000, median: 145000, location: "Varies by region" },
      { role: "Director / Executive", min: 150000, max: 220000, median: 180000, location: "Varies by region" },
    ],
    growthRate: 5,
    demandLevel: "MEDIUM",
    topSkills: ["Communication", "Problem Solving", "Adaptability", "Teamwork", "Time Management"],
    marketOutlook: "NEUTRAL",
    keyTrends: [
      "Growing adoption of AI-assisted tools in daily workflows",
      "Continued shift toward remote and hybrid work",
      "Increasing emphasis on continuous upskilling",
    ],
    recommendedSkills: ["Digital literacy", "Data-informed decision making", "Cross-functional collaboration"],
  };
}
