import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import Loader from "../../../components/Loader";

import { SEE_TODOS_QUERY } from "./RecipeToDoModel";

import RecipeToDoScreen from "./RecipeToDoScreen";

export default RecipeToDoController = ({
  navigation,
  route,
  recipeId,
  headerHeight,
}) => {
  const [toDos, setToDos] = useState([]);
  const _onCompleted = ({ seeRecipe }) => {
    setToDos(seeRecipe.toDos);
  };
  const { data, loading } = useQuery(SEE_TODOS_QUERY, {
    variables: { id: recipeId },
    onCompleted: _onCompleted,
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <RecipeToDoScreen
      navigation={navigation}
      route={route}
      toDos={toDos}
      toDosCount={data.seeRecipe.toDosCount}
      headerHeight={headerHeight}
    />
  );
};
