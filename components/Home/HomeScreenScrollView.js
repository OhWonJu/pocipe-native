import React from "react";
import { Animated } from "react-native";
import { useCollapsibleScene } from "react-native-collapsible-tab-view";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.bgColor};
  padding: 0px 20px 0px 20px;
`;

export default ({ route, children }) => {
  const scrollPropsAndRef = useCollapsibleScene(route.name);

  return (
    <Container>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        {...scrollPropsAndRef}
        bounces={false}
      >
        {children}
      </Animated.ScrollView>
    </Container>
  );
};
