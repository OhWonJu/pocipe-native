import React from "react";
import { View, Text } from "react-native";
import CommonHeader from "../components/CommonHeader";
import Container from "../components/Container";

export default Profile = ({ navigation }) => {
  return (
    <>
      <CommonHeader navigation={navigation} title={"마이페이지"} />
      <Container>
        <View>
          <Text>Profile</Text>
        </View>
      </Container>
    </>
  );
};
