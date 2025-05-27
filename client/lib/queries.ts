import { gql } from '@apollo/client';

export const USERS_QUERY = gql`
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
`;
