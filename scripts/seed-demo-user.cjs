
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const EMAIL = "demo@example.com";
const PASSWORD = "Demo@1234";
const INDUSTRY = "Software Engineering";

const demoResume = {
  contact: {
    fullName: "Alex Morgan",
    title: "Full Stack Developer | MERN | React.js · Node.js",
    email: "alex.morgan@example.com",
    mobile: "+1 555 0100",
    location: "San Francisco, CA",
    github: "github.com/alexmorgan-demo",
  },
  summary:
    "Full-stack developer with 3+ years of experience building web applications with React, Node.js, and PostgreSQL. Passionate about clean code and user-centric design.",
  skills: [
    "Frontend Development: React.js, Next.js, JavaScript, TypeScript, HTML5, CSS3",
    "Backend Development: Node.js, Express, REST APIs, GraphQL",
    "Databases: PostgreSQL, MongoDB, Prisma",
    "DevOps & Cloud: Docker, AWS, CI/CD",
  ],
  experience: [
    {
      title: "Software Engineer",
      company: "Example Tech Co",
      location: "Remote",
      startDate: "Jan 2023",
      endDate: "Present",
      current: true,
      description:
        "Built and maintained customer-facing web applications serving 50,000+ users.\nCollaborated with design and product teams to ship new features on a bi-weekly release cycle.\nImproved application performance, reducing page load times by 35%.",
    },
    {
      title: "Frontend Developer Intern",
      company: "Startup Labs",
      location: "Remote",
      startDate: "Jun 2022",
      endDate: "Dec 2022",
      description: "Built reusable UI components in React and integrated REST APIs.",
    },
  ],
  projects: [
    {
      name: "Task Management App",
      link: "",
      date: "2024",
      description:
        "Built a full-stack task management application with real-time collaboration features using Socket.IO.",
    },
  ],
  education: [
    {
      degree: "B.S. Computer Science",
      institution: "State University",
      location: "",
      startDate: "2018",
      endDate: "2022",
      description: "",
    },
  ],
  certifications: [],
};

const demoCoverLetter = {
  companyName: "Example Tech Co",
  jobTitle: "Frontend Engineer",
  jobDescription:
    "We are looking for a Frontend Engineer with strong React and TypeScript experience to join our growing team.",
};

async function main() {
  const passwordHash = await bcrypt.hash(PASSWORD, 10);

  let industryInsight = await prisma.industryInsight.findUnique({ where: { industry: INDUSTRY } });
  if (!industryInsight) {
    industryInsight = await prisma.industryInsight.create({
      data: {
        industry: INDUSTRY,
        salaryRanges: [
          { role: "Software Engineer", min: 90000, max: 170000, median: 125000, location: "US" },
          { role: "Senior Software Engineer", min: 130000, max: 210000, median: 165000, location: "US" },
        ],
        growthRate: 12,
        demandLevel: "HIGH",
        topSkills: ["React", "Node.js", "TypeScript", "AWS", "System Design"],
        marketOutlook: "POSITIVE",
        keyTrends: ["AI-assisted development", "Remote-first hiring", "Platform engineering"],
        recommendedSkills: ["System design", "Cloud architecture"],
        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
  }

  const user = await prisma.user.upsert({
    where: { email: EMAIL },
    update: {
      password: passwordHash,
      isAccountVerified: true,
      name: "Demo User",
      industry: INDUSTRY,
      experience: 3,
      skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
      bio: "Demo account for exploring AI Career Coach.",
      industryInsightId: industryInsight.id,
    },
    create: {
      name: "Demo User",
      email: EMAIL,
      password: passwordHash,
      isAccountVerified: true,
      industry: INDUSTRY,
      experience: 3,
      skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
      bio: "Demo account for exploring AI Career Coach.",
      industryInsightId: industryInsight.id,
    },
  });

  await prisma.resume.upsert({
    where: { userId: user.id },
    update: { content: JSON.stringify(demoResume) },
    create: { userId: user.id, content: JSON.stringify(demoResume) },
  });

  const existingLetter = await prisma.coverLetter.findFirst({ where: { userId: user.id } });
  if (!existingLetter) {
    await prisma.coverLetter.create({
      data: {
        userId: user.id,
        companyName: demoCoverLetter.companyName,
        jobTitle: demoCoverLetter.jobTitle,
        jobDescription: demoCoverLetter.jobDescription,
        status: "completed",
        content: `# Cover Letter\n\nDear Hiring Manager,\n\nI am excited to apply for the ${demoCoverLetter.jobTitle} position at ${demoCoverLetter.companyName}. This is a sample cover letter generated for the demo account — try generating your own from the Cover Letter tool!\n\nSincerely,\nAlex Morgan`,
      },
    });
  }

  console.log(JSON.stringify({ id: user.id, email: user.email, password: PASSWORD }));
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
