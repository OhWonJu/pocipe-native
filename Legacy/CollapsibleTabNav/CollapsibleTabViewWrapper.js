import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";
import constants from "../../constants";

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.bgColor};
  padding: 0px 20px 0px 20px;
`;

export default ({
  children,
  route,
  listArrRef,
  headerHeight,
  scrollY,
  isFocused,
  onMomentumScrollBegin,
  onMomentumScrollEnd,
  onScrollEndDrag,
}) => {
  return (
    <Container headerHeight={headerHeight}>
      <Animated.ScrollView
        ref={ref => {
          let found = listArrRef.current.find(e => e.key === route?.name);
          if (!found) {
            listArrRef.current.push({
              key: route.name,
              value: ref,
            });
          }
        }}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: headerHeight,
          minHeight: constants.window.height + headerHeight - 48,
        }}
        onScroll={
          isFocused
            ? Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: true }
              )
            : null
        }
        onMomentumScrollBegin={onMomentumScrollBegin}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScrollEndDrag={onScrollEndDrag}
        bounces={false}
      >
        {children}
      </Animated.ScrollView>
    </Container>
  );
};
