import React, { useCallback } from "react";
import { Animated, StyleSheet } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  background-color: ${props => props.theme.bgColor};
`;

export default ({ children, setHeaderHeight, headerTranslateY }) => {
  const headerOnLayout = useCallback(event => {
    const { height } = event.nativeEvent.layout;
    setHeaderHeight(height);
  }, []);

  return (
    <Animated.View
      style={{
        ...styles.headerContainer,
        transform: [{ translateY: headerTranslateY }],
      }}
      onLayout={headerOnLayout}
      pointerEvents="box-none"
      headerTranslateY={headerTranslateY}
    >
      <Container>{children}</Container>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    width: "100%",
  },
});
