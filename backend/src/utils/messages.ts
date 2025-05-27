export const ERROR_MESSAGES = {
  USER_NOT_FOUND: 'User not found',
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  EMAIL_NOT_VERIFIED: 'Please verify your email before logging in',
  INVALID_TOKEN: 'Invalid or expired token',
  UNAUTHORIZED: 'Unauthorized access',
  VALIDATION_ERROR: 'Validation error',
  SERVER_ERROR: 'Internal server error',
  EMAIL_SEND_ERROR: 'Failed to send email',
  PASSWORD_RESET_SUCCESS: 'Password reset successfully',
  EMAIL_VERIFICATION_SUCCESS: 'Email verified successfully',
} as const;

export const SUCCESS_MESSAGES = {
  REGISTRATION_SUCCESS: 'Registration successful. Please check your email for verification.',
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logout successful',
  PASSWORD_RESET_EMAIL_SENT: 'Password reset email sent successfully',
  EMAIL_VERIFICATION_SENT: 'Verification email sent successfully',
} as const;