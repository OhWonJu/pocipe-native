import { gql } from "@apollo/client";

export const RECIPE_CARD_QUREY = gql`
  query seeMyRecipe {
    seeMyRecipe {
      id
      chef {
        userName
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
