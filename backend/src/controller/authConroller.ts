import { prisma } from '../config/database';
import { hashPassword, comparePassword } from '../utils/hash';


import { LoginInput ,  RegisterInput,

  AuthResponse,
  ResetPasswordInput,} from '../types/authTypes';
import { ERROR_MESSAGES } from '../utils/messages';
import { TokenService } from '../services/tokenService';
import { EmailService } from '../services/emailService';

export class AuthController {
  static async register(input: RegisterInput): Promise<{ message: string }> {
    const { email, password, firstName, lastName } = input;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error(ERROR_MESSAGES.EMAIL_ALREADY_EXISTS);
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Generate email verification token
    const emailVerificationToken = TokenService.generateEmailVerificationToken();

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        emailVerificationToken,
      },
    });

    // Send verification email
    try {
      await EmailService.sendVerificationEmail(email, emailVerificationToken);
    } catch (error) {
      console.error('Failed to send verification email:', error);
      // Don't throw error here, user is created successfully
    }

    return {
      message: ` Hello ${user.firstName}! Registration successful. Please check your email for verification.`,
    };
  }



  static async login(input: LoginInput): Promise<AuthResponse> {
    const { email, password } = input;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    // Check password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    // Check if email is verified
    if (!user.isEmailVerified) {
      throw new Error(ERROR_MESSAGES.EMAIL_NOT_VERIFIED);
    }

    // Generate tokens
    const accessToken = TokenService.generateAccessToken({
      userId: user.id,
      email: user.email,
    });
    const refreshToken = TokenService.generateRefreshToken();

    // Save refresh token
    await TokenService.saveRefreshToken(user.id, refreshToken);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName:user.firstName,
        lastName: user.lastName,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt,
      },
      accessToken,
      refreshToken,
    };
  }

  static async refreshToken(token: string): Promise<AuthResponse> {
    const userId = await TokenService.verifyRefreshToken(token);
    if (!userId) {
      throw new Error(ERROR_MESSAGES.INVALID_TOKEN);
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    // Generate new tokens
    const accessToken = TokenService.generateAccessToken({
      userId: user.id,
      email: user.email,
    });
    const refreshToken = TokenService.generateRefreshToken();

    // Delete old refresh token and save new one
    await TokenService.deleteRefreshToken(token);
    await TokenService.saveRefreshToken(user.id, refreshToken);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt,
      },
      accessToken,
      refreshToken,
    };
  }

  static async logout(refreshToken: string): Promise<{ message: string }> {
    await TokenService.deleteRefreshToken(refreshToken);
    return { message: 'Logout successful' };
  }

  static async verifyEmail(token: string): Promise<{ message: string }> {
    const user = await prisma.user.findFirst({
      where: { emailVerificationToken: token },
    });

    if (!user) {
      throw new Error(ERROR_MESSAGES.INVALID_TOKEN);
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        emailVerificationToken: null,
      },
    });

    return { message: 'Email verified successfully' };
  }

  static async forgotPassword(email: string): Promise<{ message: string }> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Don't reveal that user doesn't exist
      return { message: 'If email exists, password reset instructions have been sent' };
    }

    const resetToken = TokenService.generatePasswordResetToken();
    const resetExpires = new Date();
    resetExpires.setHours(resetExpires.getHours() + 1); // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExpires: resetExpires,
      },
    });

    try {
      await EmailService.sendPasswordResetEmail(email, resetToken);
    } catch (error) {
      console.error('Failed to send password reset email:', error);
      throw new Error(ERROR_MESSAGES.EMAIL_SEND_ERROR);
    }

    return { message: 'Password reset instructions sent to your email' };
  }

  static async resetPassword(input: ResetPasswordInput): Promise<{ message: string }> {
    const { token, newPassword } = input;

    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      throw new Error(ERROR_MESSAGES.INVALID_TOKEN);
    }

    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });

    // Delete all refresh tokens for security
    await TokenService.deleteAllUserRefreshTokens(user.id);

    return { message: 'Password reset successfully' };
  }

  static async resendVerificationEmail(email: string): Promise<{ message: string }> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    if (user.isEmailVerified) {
      throw new Error('Email is already verified');
    }

    const emailVerificationToken = TokenService.generateEmailVerificationToken();

    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerificationToken },
    });

    try {
      await EmailService.sendVerificationEmail(email, emailVerificationToken);
    } catch (error) {
      console.error('Failed to send verification email:', error);
      throw new Error(ERROR_MESSAGES.EMAIL_SEND_ERROR);
    }

    return { message: 'Verification email sent successfully' };
  }
}