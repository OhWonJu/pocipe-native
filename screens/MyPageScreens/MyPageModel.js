import { gql } from "@apollo/client";
import { RECIPE_FRAGMENT } from "../../fragement";

export const ME_QUREY = gql`
  query me {
    me {
      id
      userName
      bio
      profilePhoto
      starCount
      totalStar
      subscribersCount
      subscribingsCount
      recipes {
        id
        title
        thumbNails
        servings
        difficulty
        cookingTime
        starAverage
        dipsCount
      }
    }
  }
`;
