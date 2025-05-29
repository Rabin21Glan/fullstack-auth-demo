import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
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
`;

export const REGISTER_MUTATION = gql`
mutation Register($input: RegisterInput!) {
  register(input: $input) {
    message
  }
}
`;


export const REFRESH_TOKEN_MUTATION=gql`
mutation RefreshToken($refreshToken: String!) {
  refreshToken(refreshToken: $refreshToken) {
    accessToken
    refreshToken
  }
}
  `;


  export const LOGOUT_MUTATION=gql`
  mutation Logout($refreshToken: String!) {
  logout(refreshToken: $refreshToken) {
    message
  }
}`;


export const VERIFY_EMAIL_MUTATION=gql`
mutation VerifyEmail($token: String!) {
  verifyEmail(token: $token) {
    message
  }
}`;


export const FORGOT_PASSWORD_MUTATION=gql`

mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    message
  }
}
`


export const RESETPASSWORD_MUTATION=gql`
mutation ResetPassword($input: ResetPasswordInput!) {
  resetPassword(input: $input) {
    message
  }
}`

export const RESEND_VERIFICATION_EMAIL_MUTATION=gql`
mutation ResendVerificationEmail($email: String!) {
  resendVerificationEmail(email: $email) {
    message
  }
}`;
