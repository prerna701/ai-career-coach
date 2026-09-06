import prisma from '@/lib/prisma';
import transporter from '@/lib/mailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });

  const { email } = req.body || {};
  if (!email) return res.json({ success: false, message: 'Email is required' });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.json({ success: false, message: 'User not found' });

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const expireAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.user.update({
      where: { id: user.id },
      data: { resetOtp: otp, resetOtpExpireAt: expireAt }
    });

    try {
      await transporter.sendMail({
        from: `"AI Career Coach" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
        to: user.email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is ${otp}. It is valid for 24 hours.`
      });
      return res.json({ success: true, message: 'Verification OTP sent on email' });
    } catch (e) {
      console.error('Email sending failed:', e);
      return res.json({ success: false, message: 'Email sending failed. Check SMTP configuration.' });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}
