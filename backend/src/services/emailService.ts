import nodemailer from 'nodemailer';
import { env } from '../config/env';

export class EmailService {
  private static transporter = nodemailer.createTransport({
    host: env.EMAIL_HOST,
    port: env.EMAIL_PORT,
    secure: false,
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASSWORD,
    },
  });

  static async sendVerificationEmail(
    email: string,
    verificationToken: string
  ): Promise<void> {
    const verificationUrl = `${env.FRONTEND_URL}/auth/verify-email?token=${verificationToken}`;

    const mailOptions = {
      from: env.EMAIL_FROM,
      to: email,
      subject: 'Verify Your Email Address',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <h2 style="color: #333; text-align: center;">Verify Your Email Address</h2>
          <p style="color: #666; line-height: 1.6;">
            Thank you for registering! Please click the button below to verify your email address:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background-color: #007bff; color: white; padding: 12px 30px; 
                      text-decoration: none; border-radius: 5px; display: inline-block;">
              Verify Email
            </a>
          </div>
          <p style="color: #666; font-size: 14px;">
            If the button doesn't work, copy and paste this link into your browser:
            <br>
            <a href="${verificationUrl}">${verificationUrl}</a>
          </p>
          <p style="color: #999; font-size: 12px; margin-top: 40px;">
            This link will expire in 24 hours. If you didn't request this verification, please ignore this email.
          </p>
        </div>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }

  static async sendPasswordResetEmail(
    email: string,
    resetToken: string
  ): Promise<void> {
    const resetUrl = `${env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: env.EMAIL_FROM,
      to: email,
      subject: 'Reset Your Password',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <h2 style="color: #333; text-align: center;">Reset Your Password</h2>
          <p style="color: #666; line-height: 1.6;">
            You requested a password reset. Click the button below to reset your password:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background-color: #dc3545; color: white; padding: 12px 30px; 
                      text-decoration: none; border-radius: 5px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p style="color: #666; font-size: 14px;">
            If the button doesn't work, copy and paste this link into your browser:
            <br>
            <a href="${resetUrl}">${resetUrl}</a>
          </p>
          <p style="color: #999; font-size: 12px; margin-top: 40px;">
            This link will expire in 1 hour. If you didn't request this reset, please ignore this email.
          </p>
        </div>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }
}