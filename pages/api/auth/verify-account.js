import prisma from '@/lib/prisma';
import { getUserIdFromReq } from '@/lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });

  const userId = getUserIdFromReq(req);
  const { otp } = req.body || {};
  if (!userId || !otp) return res.json({ success: false, message: 'Missing details' });

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.json({ success: false, message: 'User not found' });

    if (!user.verifyOtp || user.verifyOtp !== otp) {
      return res.json({ success: false, message: 'Invalid OTP' });
    }
    if (user.verifyOtpExpireAt && user.verifyOtpExpireAt.getTime() < Date.now()) {
      return res.json({ success: false, message: 'OTP expired' });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isAccountVerified: true,
        verifyOtp: null,
        verifyOtpExpireAt: null
      }
    });

    return res.json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}
