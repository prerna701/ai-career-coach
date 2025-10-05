import prisma from '@/lib/prisma';
import { parse } from 'cookie';
import { verifyJwt } from '@/lib/jwt';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const userId = getUserIdFromReq(req);
  if (!userId) {
    return res.json({ success: false, message: 'Not authenticated' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    return res.json({
      success: true,
      userData: {
        name: user.name,
        isAccountVerified: user.isAccountVerified
      }
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

function getUserIdFromReq(req) {
  try {
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.token;
    if (!token) return null;
    const payload = verifyJwt(token);
    return payload?.id || null;
  } catch {
    return null;
  }
}
