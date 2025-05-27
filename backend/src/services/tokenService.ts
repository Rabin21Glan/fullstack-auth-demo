import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { env } from '../config/env';
import { prisma } from '../config/database';
import { JWTPayload } from '../types/authTypes';


export class TokenService {
  static generateAccessToken(payload: JWTPayload): string {
    return jwt.sign(
      payload, 
      env.JWT_SECRET,
      
       {
        expiresIn:Number.parseInt(env.JWT_EXPIRES_IN),
    });
  }

  static generateRefreshToken(): string {
    return crypto.randomBytes(40).toString('hex');
  }

  static verifyAccessToken(token: string): JWTPayload {
    return jwt.verify(token, env.JWT_SECRET) as JWTPayload;
  }

  static async saveRefreshToken(userId: string, token: string): Promise<void> {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // 30 days

    await prisma.refreshToken.create({
      data: {
        token,
        userId,
        expiresAt,
      },
    });
  }

  static async verifyRefreshToken(token: string): Promise<string | null> {
    const refreshToken = await prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!refreshToken || refreshToken.expiresAt < new Date()) {
      if (refreshToken) {
        await prisma.refreshToken.delete({
          where: { id: refreshToken.id },
        });
      }
      return null;
    }

    return refreshToken.userId;
  }

  static async deleteRefreshToken(token: string): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: { token },
    });
  }

  static async deleteAllUserRefreshTokens(userId: string): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: { userId },
    });
  }

  static generateEmailVerificationToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  static generatePasswordResetToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }
}