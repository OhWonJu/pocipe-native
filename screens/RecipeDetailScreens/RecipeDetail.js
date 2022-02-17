import { CommonActions } from "@react-navigation/native";
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text>Recipe Details! 💚</Text>
          </TouchableOpacity>
        </View>
      </Container>
    </>
  );
};
