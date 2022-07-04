import React from "react";
import { Text } from "react-native";

import HomeScreenScrollView from "../../../components/Home/HomeScreenScrollView";

export default RecipeStar = ({ navigation, route }) => {
  return (
    <HomeScreenScrollView navigation={navigation} route={route}>
      <Text>Recipe Stars</Text>
    </HomeScreenScrollView>
  );
};
