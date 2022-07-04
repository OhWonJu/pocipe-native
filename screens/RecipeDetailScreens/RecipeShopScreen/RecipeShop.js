import React from "react";
import { Text } from "react-native";

import HomeScreenScrollView from "../../../components/Home/HomeScreenScrollView";

export default RecipeShop = ({ navigation, route }) => {
  return (
    <HomeScreenScrollView navigation={navigation} route={route}>
      <Text>Recipe shop must be sooooooon!</Text>
    </HomeScreenScrollView>
  );
};
