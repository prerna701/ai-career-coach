// app/(main)/resume/_components/utils/sample-data.js
const sampleData = {
  contact: {
    fullName: "Prerna Arora",
    email: "prernaarora457@gmail.com",
    mobile: "+91 7015347630",
    linkedin: "https://linkedin.com/in/prerna",
    github: "",
    portfolio: "",
  },
  summary: "Aspiring software engineer. Built performant web apps using React and Next.js. Strong CS fundamentals and hands-on with cloud deployments.",
  skills: ["React", "Next.js", "Node.js", "PostgreSQL", "Docker", "AWS"],
  experience: [
    {
      title: "Frontend Developer Intern",
      company: "TechCorp",
      startDate: "Jan 2024",
      endDate: "Jun 2024",
      description: "Built reusable React components and optimized bundle size, improving performance by 20%. Collaborated with product to ship features.",
    },
  ],
  education: [
    {
      degree: "B.Tech Computer Science",
      institution: "XYZ University",
      startDate: "2020",
      endDate: "2024",
      description: "Relevant coursework: DS, Algorithms, DBMS. CGPA: 8.5",
    },
  ],
  projects: [
    {
      name: "Resume Builder App",
      role: "Creator",
      date: "2025",
      description: "Full-stack app using Next.js + Prisma + Postgres. Supports ATS-friendly templates and PDF export.",
    },
  ],
};

export default sampleData;
