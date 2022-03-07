import React, { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@apollo/client";

import { SEE_RECIPE_QUERY } from "./RecipeDetailModel";
import RecipeDetailView from "./RecipeDetailView";
import Loader from "../../components/Loader";

export default RecipeDetailController = ({
  navigation,
  route,
  setTabBarVisible,
}) => {
  const isFoused = useIsFocused();

  useEffect(() => {
    if (isFoused) {
      setTabBarVisible("none");
    } else {
      setTabBarVisible("flex");
    }
  }, [isFoused]);

  const { data, loading } = useQuery(SEE_RECIPE_QUERY, {
    variables: { id: route.params?.recipeId },
    skip: !route.params.recipeId,
  });

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
