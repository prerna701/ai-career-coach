import bcrypt from 'bcryptjs';
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/mailer"; // create a mailer util
import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== 'POST') 
    return res.status(405).json({ error: 'Method not allowed' });

  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

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