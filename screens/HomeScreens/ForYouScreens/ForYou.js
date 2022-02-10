import React from "react";
import { Text } from "react-native";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

import Container from "../../../components/Container";

const ScrollView = styled(Animated.ScrollView)``;

export default ForYou = () => {
  return (
    <>
      <Container>
        <ScrollView showsVerticalScrollIndicator={false} >
          <Text>ForYouScreens</Text>
        </ScrollView>
      </Container>
    </>
  );
};
