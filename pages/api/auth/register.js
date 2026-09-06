import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { signJwt } from '@/lib/jwt';
import transporter from '@/lib/mailer';
import cookie from 'cookie';

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({ success: false, message: 'Method not allowed' });

  const { name, email, password } = req.body || {};
  if (!name || !email || !password)
    return res.json({ success: false, message: 'Missing details' });

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.json({ success: false, message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashed },
    });

    const token = signJwt({ id: user.id });
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
      })
    );

    // Generate and send the verification OTP now, since the /verify-otp page
    // has no way to trigger it itself -- it only lets the user enter a code.
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const expireAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.user.update({
      where: { id: user.id },
      data: { verifyOtp: otp, verifyOtpExpireAt: expireAt },
    });

    try {
      await transporter.sendMail({
        from: `"AI Career Coach" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Verify your AI Career Coach account',
        text: `Welcome to AI Career Coach! Your verification code is ${otp}. It is valid for 24 hours.`,
      });
    } catch (e) {
      console.error('Verification email not sent:', e.message);
    }

    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}
