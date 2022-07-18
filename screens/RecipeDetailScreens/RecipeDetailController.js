import React, { useEffect, useState } from "react";
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

  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (isFoused) {
      setTabBarVisible("none");
    } else {
      setTimeout(() => {
        setTabBarVisible("flex");
      }, 400);
      // setTabBarVisible("flex");
    }
  }, [isFoused]);

  const { data, loading } = useQuery(SEE_RECIPE_QUERY, {
    variables: { id: route.params?.recipeId },
    skip: !route.params.recipeId,
  });


  const goBack = () => navigation.goBack();
  const goProfile = () =>
    navigation.navigate("Profile", { userName: data.seeRecipe.chef.userName });

  if (loading || !data) return <Loader />;

  return (
    <RecipeDetailView
      goBack={goBack}
      goProfile={goProfile}
      headerHeight={headerHeight}
      setHeaderHeight={setHeaderHeight}
      {...data.seeRecipe}
    />
  );
};
