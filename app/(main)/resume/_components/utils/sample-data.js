const sampleData = {
  contact: {
    fullName: "Prerna Arora",
    title: "Full Stack Developer  |  MERN  |  React.js · Next.js · Node.js · NestJS",
    email: "prernaarora457@gmail.com",
    mobile: "+91 70153 47630",
    location: "Mohali, Punjab",
    linkedin: "",
    github: "github.com/prerna701",
    portfolio: "",
  },
  summary:
    "Full-stack developer with 1 year of hands-on experience shipping production web applications end to end — React.js / Next.js front ends, Node.js and NestJS REST APIs, and PostgreSQL / MongoDB data layers. Delivered an enterprise after-sales support platform and two live products — a patient-booking site and a team task-management dashboard — including Dockerised CI/CD pipelines and automated cloud deployments. MCA in Cloud Computing & DevOps. Available to join immediately.",
  skills: [
    "Frontend Development: React.js, Next.js, JavaScript (ES6+), TypeScript, Redux, HTML5, CSS3, Material UI, responsive UI design",
    "Backend Development: Node.js, Express, NestJS, Flask, REST APIs, GraphQL, WebSockets, Socket.IO, JWT & CASL authorisation",
    "Databases: MongoDB, PostgreSQL, SQL, Prisma, TypeORM, schema design, indexing & query optimisation",
    "DevOps & Cloud: Docker (multi-stage builds), GitLab CI/CD, GitHub Actions, Continuous Integration, AWS, Microsoft Azure, Linux, cloud VM deployment",
    "Tools & Practices: Git, Postman, Jest, Agile, Scrum, Software Development Life Cycle (SDLC)",
  ],
  experience: [
    {
      title: "Software Developer Intern",
      company: "Walkwel Technology",
      location: "Mohali",
      startDate: "Feb 2026",
      endDate: "Jul 2026",
      description:
        "Built client onboarding, product catalog and order-management modules for an enterprise after-sales support platform using NestJS, PostgreSQL and TypeORM, including a multi-step client approval workflow and a version-controlled Knowledge Base with document-level access control.\nImplemented a real-time support-ticketing system with technician assignment and inspection workflows over WebSockets, with role-based access control (CASL + JWT) across Client, Technician and Admin roles.\nDesigned relational schemas and REST APIs for a project/sprint/task management system with a Next.js drag-and-drop task board and rich-text editing; added per-user permission overrides and automated task reassignment.\nIntegrated third-party systems (Zoho, Keka) through scheduled background sync jobs.\nWrote unit, integration and end-to-end tests in Jest and built a GitLab CI/CD pipeline automating database migrations, seeding, test execution, image publishing and rollback across dev, test and production Docker environments.",
    },
    {
      title: "Front End Developer Intern",
      company: "Imarticus Learning",
      location: "",
      startDate: "Jan 2024",
      endDate: "Apr 2024",
      description:
        "Built responsive, reusable user-interface components using React.js, JavaScript, HTML and CSS, and integrated them with REST APIs.",
    },
  ],
  projects: [
    {
      name: "Internal Task & Management Dashboard",
      link: "20.44.53.244:3000",
      techStack: "",
      date: "Aug 2026 – Present",
      description:
        "Built a full-stack team task-tracking dashboard — task CRUD with assignment, priority, status and due dates, plus comments, file attachments and a metrics dashboard covering total, pending, overdue and completed tasks.\nImplemented JWT authentication and role-based access control across Admin, Manager and Member roles; designed a normalized PostgreSQL schema with Prisma and built REST APIs with backend-driven search, filter, sort and pagination.\nAdded real-time updates over Socket.IO and a GitHub API integration.",
    },
    {
      name: "De Royal Kore — Patient Booking Platform",
      link: "deroyalkore.com",
      techStack: "",
      date: "Jul – Aug 2026",
      description:
        "Shipped a live patient-facing website, appointment-booking system and admin dashboard using React, TypeScript, Node.js and Express with a layered REST architecture (routes → controllers → services → repositories).\nOptimised MongoDB with indexing, connection pooling and pagination; containerised the stack with multi-stage Docker builds and automated deployment to a cloud VM via GitHub Actions and SSH.",
    },
    {
      name: "Online Voting System — MERN Stack",
      link: "",
      techStack: "",
      date: "Mar 2025",
      description:
        "Built a secure online voting platform with MongoDB, Express, React and Node.js, using role-based authentication and protected Express APIs to restrict voting access by user role.",
    },
    {
      name: "AI Career Coach",
      link: "",
      techStack: "",
      date: "Feb – Mar 2025",
      description:
        "Built an AI-powered resume-analysis platform that scores and aligns resumes against industry and ATS standards using Python and machine-learning techniques.",
    },
  ],
  education: [
    {
      degree: "MCA, Cloud Computing & DevOps",
      institution: "Chandigarh University",
      location: "Mohali",
      startDate: "2024",
      endDate: "2026",
      description: "",
    },
    {
      degree: "BCA, Cloud Computing",
      institution: "Panipat Institute of Engineering & Technology",
      location: "Panipat",
      startDate: "2021",
      endDate: "2024",
      description: "",
    },
  ],
  certifications: [],
};

export default sampleData;
