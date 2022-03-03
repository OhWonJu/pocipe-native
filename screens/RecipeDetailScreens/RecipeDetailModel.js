import { gql } from "@apollo/client";

import { RECIPE_FRAGMENT, TODO_FRAGMENT } from "../../fragement";

export const SEE_RECIPE_QUERY = gql`
  ${RECIPE_FRAGMENT}
  ${TODO_FRAGMENT}
  query seeRecipe($id: String!) {
    seeRecipe(id: $id) {
      ...RecipeFragment
      todos {
        ...TodoFragment
      }
    }
  }
`;
