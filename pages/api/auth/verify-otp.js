import prisma from '@/lib/prisma';
import { verifyJwt } from '@/lib/jwt';
import cookie from 'cookie';

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({ success: false, message: 'Method not allowed' });

  const { otp } = req.body;
  const cookieHeader = req.headers.cookie || '';
  const token = cookieHeader.split('token=').pop()?.split(';')[0];
  if (!token) return res.json({ success: false, message: 'Not authenticated' });

  const payload = verifyJwt(token);
  if (!payload) return res.json({ success: false, message: 'Invalid token' });

  try {
    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (!user) return res.json({ success: false, message: 'User not found' });

    if (user.verifyOtp !== otp || new Date() > user.verifyOtpExpireAt) {
      return res.json({ success: false, message: 'Invalid or expired OTP' });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { isAccountVerified: true, verifyOtp: null, verifyOtpExpireAt: null },
    });

    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}
