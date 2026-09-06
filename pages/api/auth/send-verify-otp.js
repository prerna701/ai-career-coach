import prisma from '@/lib/prisma';
import transporter from '@/lib/mailer';
import { verifyJwt } from '@/lib/jwt';
import cookie from 'cookie';

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({ success: false, message: 'Method not allowed' });

  const cookieHeader = req.headers.cookie || '';
  const token = cookieHeader.split('token=').pop()?.split(';')[0];
  if (!token) return res.json({ success: false, message: 'Not authenticated' });

  const payload = verifyJwt(token);
  if (!payload) return res.json({ success: false, message: 'Invalid token' });

  try {
    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (!user) return res.json({ success: false, message: 'User not found' });
    if (user.isAccountVerified) return res.json({ success: false, message: 'Account already verified' });

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const expireAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.user.update({
      where: { id: user.id },
      data: { verifyOtp: otp, verifyOtpExpireAt: expireAt },
    });

    try {
      await transporter.sendMail({
        from: `"AI Career Coach" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
        to: user.email,
        subject: 'Account Verification OTP',
        text: `Your OTP is ${otp}. It is valid for 24 hours.`,
      });
    } catch (e) {
      console.error('Email sending failed:', e);
      return res.json({ success: false, message: 'Email sending failed. Check SMTP config.' });
    }

    return res.json({ success: true, message: 'Verification OTP sent on mail' });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}
