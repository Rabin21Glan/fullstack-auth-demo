export const authTypeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    firstName: String
    lastName: String
    isEmailVerified: Boolean!
    createdAt: String!
  }

  type AuthResponse {
    user: User!
    accessToken: String!
    refreshToken: String!
  }

  type MessageResponse {
    message: String!
  }

  input RegisterInput {
    email: String!
    password: String!
    firstName: String
    lastName: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input ResetPasswordInput {
    token: String!
    newPassword: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    register(input: RegisterInput!): MessageResponse!
    login(input: LoginInput!): AuthResponse!
    refreshToken(refreshToken: String!): AuthResponse!
    logout(refreshToken: String!): MessageResponse!
    verifyEmail(token: String!): MessageResponse!
    forgotPassword(email: String!): MessageResponse!
    resetPassword(input: ResetPasswordInput!): MessageResponse!
    resendVerificationEmail(email: String!): MessageResponse!
  }
`;