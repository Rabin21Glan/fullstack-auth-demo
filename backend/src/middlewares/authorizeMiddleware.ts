import { Request, Response, NextFunction } from 'express';

import { prisma } from '../config/database';
import { ERROR_MESSAGES } from '../utils/messages';
import { TokenService } from '../services/tokenService';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    isEmailVerified: boolean;
  };
}

export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ error: ERROR_MESSAGES.UNAUTHORIZED });
    }

    const decoded = TokenService.verifyAccessToken(token);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        isEmailVerified: true,
      },
    });

    if (!user) {
      return res.status(401).json({ error: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: ERROR_MESSAGES.INVALID_TOKEN });
  }
};