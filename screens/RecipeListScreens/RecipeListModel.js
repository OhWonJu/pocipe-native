import { gql } from "@apollo/client";

export const RECIPE_LIST_QUREY = gql`
  query seeRecipes($ids: [String!]) {
    seeRecipes(ids: $ids) {
      id
      chef {
        userName
        profilePhoto
      }
      title
      thumbNails
      servings
      difficulty
      cookingTime
      starAverage
      dipsCount
    }
  }
`;
