// app/(main)/resume/_components/utils/schema.js
import { z } from "zod";

export const resumeSchema = z.object({
  contact: z.object({
    fullName: z.string().min(1),
    email: z.string().email(),
    mobile: z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    portfolio: z.string().optional(),
  }).optional(),
  summary: z.string().optional(),
  skills: z.array(z.string()).optional(),
  experience: z.array(z.any()).optional(),
  education: z.array(z.any()).optional(),
  projects: z.array(z.any()).optional(),
});
