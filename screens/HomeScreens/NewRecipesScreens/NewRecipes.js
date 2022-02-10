import React from "react";
import { Text } from "react-native";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

const Container = styled(Animated.View)`
  background-color: ${props => props.theme.bgColor};
`;

export default NewRecipes = () => {
  return (
    <Container>
      <Animated.ScrollView showsVerticalScrollIndicator={false}>
        {new Array(20).fill(null).map((_, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Text key={index} style={{ padding: 20, color: "red" }}>
              {index}
            </Text>
          );
        })}
      </Animated.ScrollView>
    </Container>
  );
};
