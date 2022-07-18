import { gql } from "@apollo/client";

import { TODO_FRAGMENT } from "../../../fragement";

export const SEE_TODOS_QUERY = gql`
  query seeRecipe($id: String!) {
    seeRecipe(id: $id) {
      toDos {
        ...TodoFragment
      }
      toDosCount
    }
  }
  ${TODO_FRAGMENT}
`;
