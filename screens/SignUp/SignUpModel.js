import { gql } from "@apollo/client";

export const SEARCH_USER = gql`
  query seeProfile($userName: String!) {
    seeProfile(userName: $userName) {
      userName
    }
  }
`;
