import React, { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@apollo/client";

import { SEE_RECIPE_QUERY } from "./RecipeDetailModel";
import RecipeDetailView from "./RecipeDetailView";
import Loader from "../../components/Loader";

const RecipeDetailController = ({
  navigation,
  route,
  // setTabBarVisible,
}) => {
  // const isFoused = useIsFocused();

  // useEffect(() => {
  //   if (isFoused) {
  //     setTabBarVisible("none");
  //   } else {
  //     setTimeout(() => {
  //       setTabBarVisible("flex");
  //     }, 500);
  //     // setTabBarVisible("flex");
  //   }
  // }, [isFoused]);
  const { data, loading } = useQuery(SEE_RECIPE_QUERY, {
    variables: { id: route.params?.recipeId },
    skip: !route.params.recipeId,
  });
  console.log("card:", route.params.test);

  const goBack = () => navigation.goBack();
  const goProfile = () => navigation.navigate("Profile");

  if (loading || !data) return <Loader />;

  return (
    <RecipeDetailView
      data={data.seeRecipe}
      goBack={goBack}
      goProfile={goProfile}
    />
  );
};

// RecipeDetailController.sharedElements = route => {
//   const id = `${route.params.recipeId}-0`;
//   return [{ id, animation: "move" }];
// };

export default RecipeDetailController;
