// import { PrismaClient } from '@prisma/client';
// import { requireAuth } from '@/lib/authMiddleware';

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//   const decoded = requireAuth(req, res);
//   if (!decoded) return; // auth failed, response already sent

//   const user = await prisma.user.findUnique({
//     where: { id: decoded.userId },
//     select: { id: true, name: true, email: true }
//   });

//   res.status(200).json(user);
// }
import { PrismaClient } from "@prisma/client";
import { requireAuth } from "@/lib/authMiddleware";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    // run auth check
    const decoded =  requireAuth(req, res);
    if (!decoded) return; // authMiddleware already sent 401

    // fetch user
    const user = await prisma.user.findUnique({
      where: { id: decoded.id }, 
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error("Error in /api/auth/me:", err);
    return res.status(500).json({ message: "Server error" });
  }
}
