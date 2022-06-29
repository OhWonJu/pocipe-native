import { gql } from "@apollo/client";

export const GET_SNS_INFO = gql`
  query getSNSInfo($email: String!, $snsKey: String!) {
    getSNSInfo(email: $email, snsKey: $snsKey) {
      ok
      snsKey
    }
  }
`;

export const SET_SNS_KEY = gql`
  mutation setSNSKey($email: String!, $password: String!, $snsKey: String!) {
    setSNSKey(email: $email, password: $password, snsKey: $snsKey) {
      ok
      error
    }
  }
`;

export const SNS_SIGN_IN = gql`
  mutation loginWithSNS($email: String!, $snsKey: String!) {
    loginWithSNS(email: $email, snsKey: $snsKey) {
      ok
      token
      error
    }
  }
`;
