import React from "react";
import { BaseButton } from "react-native-gesture-handler";
import styled from "styled-components/native";

const Container = styled.View`
  flex-direction: row;
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : props.theme.yellowColor};
  border-radius: ${(props) => props.radius}px;
  ${(props) => props.height && { height: props.height }}
  width: ${(props) => (props.width ? props.width : "50%")};
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;
const Text = styled.Text`
  /* color: #ffffff; */
  color: ${(props) => (props.txColor ? props.txColor : props.theme.bgColor)};
  text-align: center;
  font-size: ${(props) => (props.txSize ? props.txSize : "12")}px;
`;

const Button = ({
  text,
  onPress,
  disable = false,
  width,
  height = null,
  bgColor = null,
  txColor = null,
  txSize = null,
  icon = null,
  radius = 10,
}) => (
  <Container
    disabled={disable}
    onPress={onPress}
    bgColor={bgColor}
    width={width}
    height={height}
    radius={radius}
    pointerEvents="box-none"
  >
    <BaseButton
      enabled={!disable}
      onPress={onPress}
      style={{
        width: "100%",
        height: "100%",
        padding: 10,
        borderRadius: radius,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icon}
      <Text txColor={txColor} txSize={txSize}>
        {text}
      </Text>
    </BaseButton>
  </Container>
);

export default Button;
