import React from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";
import constants from "../../constants";

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.bgColor};
  padding: 0px 20px 0px 20px;
`;
const Scroll = styled(Animated.ScrollView)`
  /* padding-top: ${props => props.headerHeight}px; */
`;

export default ({
  children,
  headerHeight,
  scrollY,
  onMomentumScrollBegin,
  onMomentumScrollEnd,
  onScrollEndDrag,
}) => {
  return (
    <Container headerHeight={headerHeight}>
      <Scroll
        headerHeight={headerHeight}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: headerHeight,
          minHeight: constants.window.height + headerHeight,
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        bounces={false}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScrollEndDrag={onScrollEndDrag}
      >
        {children}
      </Scroll>
    </Container>
  );
};
