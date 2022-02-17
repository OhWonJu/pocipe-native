import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Container from "../../components/Container";

export default ({ navigation, route }) => {
  return (
    <>
      <Container>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("MainBottomTabNav", {
                screen: `Tab${route.params.from}`,
                params: { screen: "Profile" },
              })
            }
          >
            <Text>Recipe Details! 💚</Text>
          </TouchableOpacity>
        </View>
      </Container>
    </>
  );
};
