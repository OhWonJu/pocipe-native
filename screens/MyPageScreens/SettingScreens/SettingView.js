import React from "react";
import { View, Text } from "react-native";
import CommonHeader from "../../../components/CommonHeader";
import Container from "../../../components/Container";

export default ({ navigation }) => {
  return (
    <>
      <CommonHeader navigation={navigation} type={"Setting"} title={"설정"} />
      <Container>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Setting🛠</Text>
        </View>
      </Container>
    </>
  );
};
