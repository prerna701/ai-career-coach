import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });

  const { email, otp, newpassword } = req.body || {};
  if (!email || !otp || !newpassword) {
    return res.json({ success: false, message: 'Missing details' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.json({ success: false, message: 'User not found' });

    if (!user.resetOtp || user.resetOtp !== otp) {
      return res.json({ success: false, message: 'Invalid OTP' });
    }
    if (user.resetOtpExpireAt && user.resetOtpExpireAt.getTime() < Date.now()) {
      return res.json({ success: false, message: 'OTP expired' });
    }

    const hash = await bcrypt.hash(newpassword, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hash,
        resetOtp: null,
        resetOtpExpireAt: null
      }
    });

    return res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}
