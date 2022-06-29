import { gql } from "@apollo/client";

export const SEARCH_USER = gql`
  query seeProfile($userName: String!) {
    seeProfile(userName: $userName) {
      userName
    }
  }
`;

export const REQUEST_ACCOUNT_CODE = gql`
  query requestAccountCode($email: String!) {
    requestAccountCode(email: $email) {
      ok
      error
      code
    }
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $firstName: String
    $lastName: String
    $userName: String!
    $email: String!
    $password: String!
    $snsKey: String
    $phoneNumber: String
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      userName: $userName
      email: $email
      password: $password
      snsKey: $snsKey
      phoneNumber: $phoneNumber
    ) {
      ok
      error
    }
  }
`;
