import { gql } from "@apollo/client";

export const GET_SNS_INFO = gql`
  query getSNSKey($email: String!, $snsKey: String!) {
    getSNSKey(email: $email, snsKey: $snsKey) {
      ok
      snsKey
    }
  }
`;
