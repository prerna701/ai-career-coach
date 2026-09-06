import bcrypt from 'bcryptjs';
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/mailer"; // create a mailer util
import { signJwt } from "@/lib/jwt";
import { serialize } from "cookie";
import crypto from "crypto";

// Public demo account (see scripts/seed-demo-user.cjs) — its email isn't a
// real inbox, so it can't receive an OTP. Skip straight to a session instead.
const DEMO_EMAIL = "demo@example.com";

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' });

  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

  if (user.email === DEMO_EMAIL) {
    const token = signJwt({ id: user.id });
    res.setHeader("Set-Cookie", serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    }));
    return res.status(200).json({ success: true, step: "done" });
  }

  // Generate OTP
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  const expireAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

  await prisma.user.update({
    where: { id: user.id },
    data: { loginOtp: otp, loginOtpExpireAt: expireAt }
  });

  // Send OTP via email (don't let a broken/unconfigured SMTP server 500 the login request)
  try {
    await sendEmail(user.email, "Login OTP", `Your OTP is ${otp}`);
  } catch (err) {
    console.error("Failed to send login OTP email:", err.message);
    console.log(`[DEV FALLBACK] Login OTP for ${user.email}: ${otp}`);
  }

  res.status(200).json({ success: true, step: "otp", email });
} ;