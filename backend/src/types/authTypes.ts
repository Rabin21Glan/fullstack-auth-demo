import { Request } from 'express';

export interface AuthContext {
  user?: {
    id: string;
    email: string;
    isEmailVerified: boolean;
  };
  req: Request;
}

export interface JWTPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface RegisterInput {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    firstName: string|null;
    lastName: string|null;
    isEmailVerified: boolean;
    createdAt: Date;
  };
  accessToken: string;
  refreshToken: string;
}

export interface ResetPasswordInput {
  token: string;
  newPassword: string;
}