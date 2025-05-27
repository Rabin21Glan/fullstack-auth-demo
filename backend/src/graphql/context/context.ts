import { Request } from 'express';
import { AuthContext } from '../../types/authTypes';
import { TokenService } from '../../services/tokenService';
import { prisma } from '../../config/database';


export const createContext = async ({ req }: { req: Request }): Promise<AuthContext> => {
  const context: AuthContext= { req };

  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = TokenService.verifyAccessToken(token);
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          isEmailVerified: true,
        },
      });

      if (user) {
        context.user = user;
      }
    }
  } catch (error) {
    // Token is invalid, but we don't throw error here
    // Let resolvers handle authentication requirements
  }

  return context;
};