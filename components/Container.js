import React from "react";
import { Keyboard } from "react-native";
import styled from "styled-components/native";

const Container = styled.TouchableOpacity`
  flex: 1;
  background-color: ${(props) => props.theme.bgColor};
  padding: 0px 20px 0px 20px;
`;

// TouchableWithoutFeedback은 자식 컴포넌트가 하나로 묶여서 와야하나봄..
export default ({ onLayout = null, style, children }) => {
  const dismissKeyboard = () => {
    // RN Keyboard API
    Keyboard.dismiss();
  };

  return (
    <Container
      pointerEvent="box-none"
      activeOpacity={1}
      onPress={dismissKeyboard}
      onLayout={onLayout}
      style={style}
    >
      {children}
    </Container>
  );
};
