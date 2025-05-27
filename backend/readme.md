# Authentication Backend

A complete authentication backend built with TypeScript, Node.js, Express, GraphQL (Apollo Server), Prisma, and MySQL.

## Features

- **User Registration** with email verification
- **Email-based Authentication** (login/logout)
- **JWT Tokens** (access + refresh tokens)
- **Password Reset** functionality
- **Email Verification** system
- **GraphQL API** with Apollo Server
- **MySQL Database** with Prisma ORM
- **Type-safe** with TypeScript
- **Security Best Practices**
- **Professional Folder Structure**

## Quick Start

### 1. Clone and Install
```bash
git clone <repository-url>
cd auth-backend
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Database Setup
```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Optional: Open Prisma Studio
npm run db:studio
```

### 4. Start Development Server
```bash
npm run dev
```

The server will start at `http://localhost:4000/graphql`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | MySQL connection string | ✅ |
| `JWT_SECRET` | Secret for access tokens | ✅ |
| `JWT_REFRESH_SECRET` | Secret for refresh tokens | ✅ |
| `EMAIL_HOST` | SMTP host (e.g., smtp.gmail.com) | ✅ |
| `EMAIL_USER` | SMTP username | ✅ |
| `EMAIL_PASSWORD` | SMTP password/app password | ✅ |
| `EMAIL_FROM` | From email address | ✅ |
| `FRONTEND_URL` | Frontend URL for email links | ❌ |
| `PORT` | Server port | ❌ |

## GraphQL API

### Queries
```graphql
# Get current user info
query Me {
  me {
    id
    email
    firstName
    lastName
    isEmailVerified
    createdAt
  }
}
```

### Mutations
```graphql
# Register new user
mutation Register($input: RegisterInput!) {
  register(input: $input) {
    message
  }
}

# Login user
mutation Login($input: LoginInput!) {
  login(input: $input) {
    user {
      id
      email
      firstName
      lastName
      isEmailVerified
    }
    accessToken
    refreshToken
  }
}

# Refresh access token
mutation RefreshToken($refreshToken: String!) {
  refreshToken(refreshToken: $refreshToken) {
    user { id email }
    accessToken
    refreshToken
  }
}

# Logout user
mutation Logout($refreshToken: String!) {
  logout(refreshToken: $refreshToken) {
    message
  }
}

# Verify email
mutation VerifyEmail($token: String!) {
  verifyEmail(token: $token) {
    message
  }
}

# Forgot password
mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    message
  }
}

# Reset password
mutation ResetPassword($input: ResetPasswordInput!) {
  resetPassword(input: $input) {
    message
  }
}

# Resend verification email
mutation ResendVerificationEmail($email: String!) {
  resendVerificationEmail(email: $email) {
    message
  }
}
```

## Authentication Flow

1. **Registration**: User registers → Email verification sent
2. **Email Verification**: User clicks link → Email verified
3. **Login**: User logs in → Returns access & refresh tokens
4. **Protected Routes**: Include `Authorization: Bearer <token>` header
5. **Token Refresh**: Use refresh token to get new access token
6. **Password Reset**: Request reset → Email sent → Reset with token

## Security Features

- Password hashing with bcrypt (12 rounds)
- JWT tokens with expiration
- Refresh token rotation
- Email verification required
- Password strength validation
- Rate limiting ready
- SQL injection protection (Prisma)
- XSS protection headers

## Project Structure

```
src/
├── config/          # Database and environment configuration
├── graphql/         # GraphQL schemas, resolvers, and context
├── middleware/      # Express middleware (auth, error handling)
├── services/        # Business logic (auth, email, token services)
├── utils/           # Utilities (hashing, validation, constants)
├── types/           # TypeScript type definitions
└── server.ts        # Main server file
```

## Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run db:migrate   # Run database migrations
npm run db:generate  # Generate Prisma client
npm run db:studio    # Open Prisma Studio
```

## Production Deployment

1. Set all environment variables
2. Run database migrations: `npm run db:migrate`
3. Build the application: `npm run build`
4. Start the server: `npm start`

## Email Configuration

For Gmail:
1. Enable 2-factor authentication
2. Generate an App Password
3. Use the App Password in `EMAIL_PASSWORD`

## Database Schema

- **Users**: Store user account information
- **RefreshTokens**: Store active refresh tokens with expiration

The schema automatically handles:
- User creation timestamps
- Token expiration
- Cascade deletes for refresh tokens

## Contributing

1. Follow TypeScript best practices
2. Use Prisma for all database operations
3. Add proper error handling
4. Update tests for new features
5. Follow the existing folder structure

## Support

For issues and questions:
- Check the error logs in console
- Verify environment variables
- Ensure database is running
- Check email service configuration
```

This completes the full authentication backend! The system includes:

✅ **Complete Authentication System**
- User registration with email verification
- Secure login/logout
- JWT access and refresh tokens
- Password reset functionality
- Email verification system

✅ **Professional Architecture**
- Clean folder structure
- Separation of concerns
- Type-safe TypeScript
- Error handling middleware
- Validation with Zod

✅ **GraphQL API**
- Apollo Server integration
- Complete schema definitions
- Context-based authentication
- Comprehensive resolvers

✅ **Security Best Practices**
- Password hashing (bcrypt)
- JWT token management
- Email verification required
- Input validation
- SQL injection protection

✅ **Production Ready**
- Environment configuration
- Database migrations
- Graceful shutdown
- Health check endpoint
- Comprehensive documentation

To get started:
1. Install dependencies: `npm install`
2. Set up your `.env` file with database and email credentials
3. Run migrations: `npm run db:migrate`
4. Start development server: `npm run dev`

The GraphQL playground will be available at `http://localhost:4000/graphql` where you can test all the authentication mutations and queries!