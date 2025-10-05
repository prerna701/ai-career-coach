import prisma from "@/lib/prisma";
import { verifyJwt, signJwt } from "@/lib/jwt";
import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method !== 'POST') 
    return res.status(405).json({ error: 'Method not allowed' });

  const { email, otp } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: "Invalid email" });

  // Check OTP validity
  if (user.loginOtp !== otp || new Date() > user.loginOtpExpireAt) {
    return res.status(401).json({ error: "Invalid or expired OTP" });
  }

  // Clear OTP fields
  await prisma.user.update({
    where: { id: user.id },
    data: { loginOtp: null, loginOtpExpireAt: null,isAccountVerified: true }
  });

  // Generate JWT token
  const token = signJwt({ id: user.id });

  // Set token cookie
  res.setHeader("Set-Cookie", serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7 // 7 days
  }));

  return res.json({ success: true });
}
