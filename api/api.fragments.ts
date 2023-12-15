import { gql } from "graphql-request";

export const UserBasicFields = gql`
  fragment UserBasicFields on User {
    firstName
    lastName
    email
    role
    emailVerifiedAt
  }
`;
