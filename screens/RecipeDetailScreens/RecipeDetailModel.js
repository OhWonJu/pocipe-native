import { gql } from "@apollo/client";

import { TODO_FRAGMENT } from "../../fragement";

export const SEE_RECIPE_QUERY = gql`
  query seeRecipe($id: String!) {
    seeRecipe(id: $id) {
      id
      chef {
        userName
        profilePhoto
      }
      dipsCount
      title
      caption
      thumbNails
      servings
      difficulty
      cookingTime
      commentsCount
      totalStar
      givnStar
      starsCount
      starAverage
      toDos {
        ...TodoFragment
      }
      toDosCount
      kategories {
        kategorie
      }
      ingredients {
        ingredient
      }
      isMine
      createdAt
    }
  }
  ${TODO_FRAGMENT}
`;
