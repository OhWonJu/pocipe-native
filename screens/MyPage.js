import React from "react";
import { View, Text } from "react-native";
import CommonHeader from "../components/CommonHeader";
import Container from "../components/Container";

export default MyPage = ({ navigation }) => {
  return (
    <>
      <CommonHeader
        navigation={navigation}
        type={"MyPage"}
        title={"마이페이지"}
      />
      <Container>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>My Page</Text>
        </View>
      </Container>
    </>
  );
};
