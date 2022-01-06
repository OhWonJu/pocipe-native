import React from "react"
import { View, Text } from "react-native";

import Container from "../components/Container";
import HomeHeader from "../components/Home/HomeHeader";

export default Home = () => {
  return (
    <>
      <HomeHeader leftOnPress={() => alert("HI")} />
      <Container>
        <View>
          <Text>Home</Text>
        </View>
      </Container>
    </>
  );
};
