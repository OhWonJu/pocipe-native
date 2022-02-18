import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, BackHandler } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Container from "../../components/Container";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

export default ({ navigation, route, setTabBarVisible }) => {
  const isFoused = useIsFocused();

  useEffect(() => {
    if (isFoused) {
      setTabBarVisible("none");
    } else {
      setTabBarVisible("flex");
    }
  }, [isFoused]);

  return (
    <>
      <Container>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center"}}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Profile");
            }}
          >
            <Text>Recipe Details! 💚</Text>
          </TouchableOpacity>
        </View>
      </Container>
    </>
  );
};
