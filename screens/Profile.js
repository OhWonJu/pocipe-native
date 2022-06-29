import React, { useEffect } from "react";
import { View, Text } from "react-native";
import CommonHeader from "../components/CommonHeader";
import Container from "../components/Container";

export default ({ navigation, route }) => {
  return (
    <>
      <CommonHeader navigation={navigation} title={route.params.userName} />
      <Container>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>{route.params.userName}'s Profile</Text>
        </View>
      </Container>
    </>
  );
};
