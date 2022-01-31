import { gql } from "@apollo/client";

export const GET_SNS_INFO = gql`
  query getSNSInfo($email: String!, $snsKey: String!) {
    getSNSInfo(email: $email, snsKey: $snsKey) {
      ok
      snsKey
    }
  }
`;
