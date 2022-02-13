import React from "react";
import { Text } from "react-native";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

import Container from "../../../components/Container";

const ScrollView = styled(Animated.ScrollView)``;

export default Subscribes = ({ headerHeight, scrollY }) => {
  return (
    <>
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text>Subscribes</Text>
        </ScrollView>
      </Container>
    </>
  );
};
