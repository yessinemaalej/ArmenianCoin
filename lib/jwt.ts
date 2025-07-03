import jwt, { SignOptions } from 'jsonwebtoken';

const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET || 'fallback-secret';

export interface JWTPayload {
  userId: string;
  email?: string;
  walletAddress?: string;
  role: string;
  iat?: number;
  exp?: number;
}

export function signJWT(
  payload: Omit<JWTPayload, 'iat' | 'exp'>,
  expiresIn: SignOptions['expiresIn'] = '7d'
): string {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyJWT(token: string): JWTPayload {
  return jwt.verify(token, JWT_SECRET) as JWTPayload;
}

export function decodeJWT(token: string): JWTPayload | null {
  try {
    return jwt.decode(token) as JWTPayload;
  } catch {
    return null;
  }
}
