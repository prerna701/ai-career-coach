// "use server";

// import prisma from "@/lib/prisma";
// import { getUserIdFromCookies } from "@/lib/auth";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-t" });

// export async function generateCoverLetter(data) {
//   const userId = await getUserIdFromCookies();
//   if (!userId) throw new Error("Unauthorized");

//   const user = await prisma.user.findUnique({
//     where: { id: userId },
//   });

//   if (!user) throw new Error("User not found");

//   const prompt = `
//     Write a professional cover letter for a ${data.jobTitle} position at ${data.companyName}.
    
//     About the candidate:
//     - Industry: ${user.industry}
//     - Years of Experience: ${user.experience}
//     - Skills: ${user.skills?.join(", ")}
//     - Professional Background: ${user.bio}
    
//     Job Description:
//     ${data.jobDescription}
    
//     Requirements:
//     1. Use a professional, enthusiastic tone
//     2. Highlight relevant skills and experience
//     3. Show understanding of the company's needs
//     4. Keep it concise (max 400 words)
//     5. Use proper business letter formatting in markdown
//     6. Include specific examples of achievements
//     7. Relate candidate's background to job requirements
    
//     Format the letter in markdown.
//   `;

//   try {
//     const result = await model.generateContent(prompt);
//     const content = result.response.text().trim();

//     const coverLetter = await prisma.coverLetter.create({
//       data: {
//         content,
//         jobDescription: data.jobDescription,
//         companyName: data.companyName,
//         jobTitle: data.jobTitle,
//         status: "completed",
//         userId: user.id,
//       },
//     });

//     return coverLetter;
//   } catch (error) {
//     console.error("Error generating cover letter:", error.message);
//     throw new Error("Failed to generate cover letter");
//   }
// }

// export async function getCoverLetters() {
//   const userId = await getUserIdFromCookies();
//   if (!userId) throw new Error("Unauthorized");

//   return await prisma.coverLetter.findMany({
//     where: { userId },
//     orderBy: { createdAt: "desc" },
//   });
// }

// export async function getCoverLetter(id) {
//   const userId = await getUserIdFromCookies();
//   if (!userId) throw new Error("Unauthorized");

//   return await prisma.coverLetter.findUnique({
//     where: { id, userId },
//   });
// }

// export async function deleteCoverLetter(id) {
//   const userId = await getUserIdFromCookies();
//   if (!userId) throw new Error("Unauthorized");

//   return await prisma.coverLetter.delete({
//     where: { id, userId },
//   });
// }
// Add this improved template function
// Add this improved template function
'use server';

import prisma from "@/lib/prisma";
import { getUserIdFromCookies } from "@/lib/auth";
import { GoogleGenerativeAI } from "@google/generative-ai";

// SIMPLE BUT SMART TEMPLATE FUNCTION
const generateTemplateCoverLetter = (data, user) => {
  const { companyName, jobTitle, jobDescription } = data;
  
  // Extract skills from job description
  const skills = extractRelevantSkills(jobTitle, jobDescription);
  const experience = user.experience || 'several';
  
  return `
# Cover Letter

**${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}**

**Hiring Manager**  
**${companyName}**

Dear Hiring Manager,

I am writing to express my enthusiastic interest in the ${jobTitle} position at ${companyName}. With ${experience} years of experience in software development and proficiency in ${skills.slice(0, 3).join(', ')}, I am confident in my ability to contribute significantly to your team.

## Why I'm a Great Fit

${generateRoleSpecificContent(jobTitle, skills)}

## Technical Skills

- **Core Technologies:** ${skills.join(', ')}
- **Development Approach:** Clean code, best practices, and agile methodologies
- **Problem Solving:** Strong analytical and systematic approach to challenges

I am particularly drawn to ${companyName} because of your reputation for excellence in the industry. I am excited about the opportunity to bring my technical expertise to your team.

Thank you for considering my application. I look forward to discussing how I can contribute to ${companyName}'s success.

Sincerely,

[Your Name]  
[Your Email] | [Your Phone] | [Your LinkedIn/Portfolio]
  `.trim();
};

// SIMPLE SKILL EXTRACTION
const extractRelevantSkills = (jobTitle, jobDescription) => {
  const jobLower = jobTitle.toLowerCase();
  const descLower = jobDescription.toLowerCase();
  
  // Define skill sets
  const skillSets = {
    frontend: ['JavaScript', 'React', 'HTML', 'CSS', 'TypeScript', 'Next.js', 'Vue', 'Angular'],
    backend: ['Node.js', 'Python', 'MongoDB', 'SQL', 'REST APIs', 'Express', 'Django', 'Java'],
    fullstack: ['JavaScript', 'React', 'Node.js', 'Python', 'MongoDB', 'HTML', 'CSS']
  };

  // Determine role type
  let roleType = 'fullstack';
  if (jobLower.includes('frontend') || descLower.includes('react') || descLower.includes('javascript')) {
    roleType = 'frontend';
  } else if (jobLower.includes('backend') || descLower.includes('node') || descLower.includes('python')) {
    roleType = 'backend';
  }

  return skillSets[roleType] || skillSets.fullstack;
};

// ROLE-SPECIFIC CONTENT
const generateRoleSpecificContent = (jobTitle, skills) => {
  const jobLower = jobTitle.toLowerCase();
  
  if (jobLower.includes('backend')) {
    return `- Strong experience in server-side development and API design
- Proficiency in database management and optimization
- Knowledge of backend architecture and scalability
- Hands-on experience with ${skills.slice(0, 4).join(', ')}`;
  } else if (jobLower.includes('frontend')) {
    return `- Experience in building responsive, user-friendly interfaces
- Proficiency in modern JavaScript frameworks and libraries
- Strong understanding of web performance and UX principles
- Hands-on experience with ${skills.slice(0, 4).join(', ')}`;
  } else {
    return `- Proven track record of delivering successful software projects
- Strong technical skills in ${skills.slice(0, 4).join(', ')}
- Excellent problem-solving and collaboration abilities
- Experience in agile development methodologies`;
  }
};

export async function generateCoverLetter(data) {
  const userId = await getUserIdFromCookies();
  if (!userId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    // Always use template for now (more reliable)
    const content = generateTemplateCoverLetter(data, user);
    
    const coverLetter = await prisma.coverLetter.create({
      data: {
        content,
        jobDescription: data.jobDescription,
        companyName: data.companyName,
        jobTitle: data.jobTitle,
        status: "completed",
        userId: user.id,
      },
    });

    return coverLetter;
  } catch (error) {
    console.error("Error generating cover letter:", error);
    throw new Error('Failed to generate cover letter');
  }
}

// Keep your other functions (getCoverLetters, getCoverLetter, deleteCoverLetter) the same
export async function getCoverLetters() {
  try {
    const userId = await getUserIdFromCookies();
    if (!userId) throw new Error("Unauthorized");

    const coverLetters = await prisma.coverLetter.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    
    return coverLetters;
  } catch (error) {
    console.error("Error fetching cover letters:", error);
    return [];
  }
}

export async function getCoverLetter(id) {
  try {
    const userId = await getUserIdFromCookies();
    if (!userId) throw new Error("Unauthorized");

    const coverLetter = await prisma.coverLetter.findUnique({
      where: { id, userId },
    });
    
    return coverLetter;
  } catch (error) {
    console.error("Error fetching cover letter:", error);
    return null;
  }
}

export async function deleteCoverLetter(id) {
  try {
    const userId = await getUserIdFromCookies();
    if (!userId) throw new Error("Unauthorized");

    const result = await prisma.coverLetter.delete({
      where: { id, userId },
    });
    
    return result;
  } catch (error) {
    console.error("Error deleting cover letter:", error);
    throw new Error("Failed to delete cover letter");
  }
}