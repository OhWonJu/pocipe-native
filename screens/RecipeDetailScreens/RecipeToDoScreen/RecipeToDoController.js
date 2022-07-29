import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SEE_TODOS_QUERY } from "./RecipeToDoModel";
import Loader from "../../../components/Loader";
import RecipeToDoScreen from "./RecipeToDoScreen";
import { setToDoAutoRun } from "../../../Store/ToDoAutoRunReducer";
import { getToDoStep, setToDoStep } from "../../../Store/ToDoStepReducer";

export default RecipeToDoController = ({
  navigation,
  route,
  recipeId,
  headerHeight,
}) => {
  // GET TODOS API //
  const [toDos, setToDos] = useState([]);
  const _onCompleted = ({ seeRecipe }) => {
    setToDos(seeRecipe.toDos);
  };
  const { data, loading } = useQuery(SEE_TODOS_QUERY, {
    variables: { id: recipeId },
    onCompleted: _onCompleted,
  });
  // --------------------------------------------------- //

  // REDUX //
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setToDoStep({ nowStep: 0, nextStep: 1 }));
    dispatch(setToDoAutoRun({ isAutoRun: true }));
  }, []);
  // ------------------------------------------------- //

  const state = useSelector(getToDoStep);
  console.log("STATE: ", state);

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
