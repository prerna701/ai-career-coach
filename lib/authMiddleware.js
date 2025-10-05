import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export function requireAuth(req, res) {
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.token;

  if (!token) {
    res.status(401).json({ error: 'Not authenticated' });
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // contains { userId, iat, exp }
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
    return null;
  }
}
