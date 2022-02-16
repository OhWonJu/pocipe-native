import React, { useState } from "react";

import HomeView from "./HomeView";

export default HomeController = ({ navigation }) => {
  const [headerHeight, setHeaderHeight] = useState(0);

  // const goBack = () => navigation.goBack();
  // const goToRecipeDetail = () => navigation.navigate("RecipeDetail");
  const goToNotification = () => navigation.navigate("Notification");

  return (
    <HomeView
      headerHeight={headerHeight}
      setHeaderHeight={setHeaderHeight}
      goToNotification={goToNotification}
    />
  );
};
