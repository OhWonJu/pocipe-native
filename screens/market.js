import React from "react";
import { View, Text } from "react-native";
import CommonHeader from "../components/CommonHeader";
import Container from "../components/Container";

export default ({ navigation }) => {
  return (
    <>
      <CommonHeader navigation={navigation} title={"마켓"} />
      <Container>
        <View>
          <Text>Will be sooooon...🔧</Text>
        </View>
      </Container>
    </>
  );
};
