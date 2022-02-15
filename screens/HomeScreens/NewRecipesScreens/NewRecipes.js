import React from "react";
import { Text } from "react-native";
import HomeScreenScrollView from "../../../components/Home/HomeScreenScrollView";

export default ({ navigation, route }) => {
  return (
    <HomeScreenScrollView navigation={navigation} route={route}>
      {new Array(20).fill(null).map((_, index) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Text key={index} style={{ paddingVertical: 20, color: "red" }}>
            {index}
          </Text>
        );
      })}
    </HomeScreenScrollView>
  );
};

