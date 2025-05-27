import { AuthService } from '../../services/authService';
import { AuthContext, RegisterInput, LoginInput, ResetPasswordInput } from '../../types/authTypes';
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '../../utils/validation';
import { ERROR_MESSAGES } from '../../utils/messages';

export const authResolvers = {
  Query: {
    me: async (_: any, __: any, context: AuthContext) => {
      if (!context.user) {
        throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
      }
      
      return context.user;
    },
  },

  Mutation: {
    register: async (_: any, { input }: { input: RegisterInput }) => {
      try {
        const validatedInput = registerSchema.parse(input);
        return await AuthService.register(validatedInput);
      } catch (error: any) {
        if (error.name === 'ZodError') {
          throw new Error(error.errors[0].message);
        }
        throw error;
      }
    },

    login: async (_: any, { input }: { input: LoginInput }) => {
      try {
        const validatedInput = loginSchema.parse(input);
        return await AuthService.login(validatedInput);
      } catch (error: any) {
        if (error.name === 'ZodError') {
          throw new Error(error.errors[0].message);
        }
        throw error;
      }
    },

    refreshToken: async (_: any, { refreshToken }: { refreshToken: string }) => {
      if (!refreshToken) {
        throw new Error('Refresh token is required');
      }
      return await AuthService.refreshToken(refreshToken);
    },

    logout: async (_: any, { refreshToken }: { refreshToken: string }) => {
      if (!refreshToken) {
        throw new Error('Refresh token is required');
      }
      return await AuthService.logout(refreshToken);
    },

    verifyEmail: async (_: any, { token }: { token: string }) => {
      if (!token) {
        throw new Error('Verification token is required');
      }
      return await AuthService.verifyEmail(token);
    },

    forgotPassword: async (_: any, { email }: { email: string }) => {
      try {
        const validatedInput = forgotPasswordSchema.parse({ email });
        return await AuthService.forgotPassword(validatedInput.email);
      } catch (error: any) {
        if (error.name === 'ZodError') {
          throw new Error(error.errors[0].message);
        }
        throw error;
      }
    },

    resetPassword: async (_: any, { input }: { input: ResetPasswordInput }) => {
      try {
        const validatedInput = resetPasswordSchema.parse(input);
        return await AuthService.resetPassword(validatedInput);
      } catch (error: any) {
        if (error.name === 'ZodError') {
          throw new Error(error.errors[0].message);
        }
        throw error;
      }
    },

    resendVerificationEmail: async (_: any, { email }: { email: string }) => {
      if (!email) {
        throw new Error('Email is required');
      }
      return await AuthService.resendVerificationEmail(email);
    },
  },
};