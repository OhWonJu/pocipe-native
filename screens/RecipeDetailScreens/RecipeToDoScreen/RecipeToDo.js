import React from "react";
import { Text } from "react-native";

import HomeScreenScrollView from "../../../components/Home/HomeScreenScrollView";

export default RecipeToDo = ({ navigation, route }) => {
  return (
    <HomeScreenScrollView navigation={navigation} route={route}>
    {new Array(20).fill(null).map((_, index) => {
      return (
        <Text key={index} style={{ paddingVertical: 20, color: "red" }}>
          {index}
        </Text>
      );
    })}
  </HomeScreenScrollView>
  );
};
