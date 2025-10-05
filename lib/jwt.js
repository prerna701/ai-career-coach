import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export function signJwt(payload, options = { expiresIn: '7d' }) {
  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyJwt(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}
               