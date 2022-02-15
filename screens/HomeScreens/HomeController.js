import React, { useState } from "react";

import HomeView from "./HomeView";

export default HomeController = ({ navigation }) => {
  const [headerHeight, setHeaderHeight] = useState(0);

  const goBack = () => navigation.goBack();
  const goToProfile = () => navigation.navigate("Profile");
  const goToRecipeDetail = () => navigation.navigate("RecipeDetail");

  return (
    <HomeView
      headerHeight={headerHeight}
      setHeaderHeight={setHeaderHeight}
      goBack={goBack}
      goToProfile={goToProfile}
      goToRecipeDetail={goToRecipeDetail}
    />
  );
};
