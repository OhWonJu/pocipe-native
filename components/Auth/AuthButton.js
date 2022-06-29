import React from "react";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";

import constants from "../../constants";

const Container = styled.TouchableOpacity`
  background-color: ${props =>
    props.bgColor ? props.bgColor : props.theme.yellowColor};
  padding: 10px;
  margin: 5px;
  height: 55px;
  border-radius: 10px;
  /* width: ${props =>
    props.widthPer
      ? constants.width / props.widthPer
      : constants.width / 1.2}px; */
  width: 100%;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.disabled ? "0.5" : "1")};
`;
const Text = styled.Text`
  /* color: #ffffff; */
  color: ${props => (props.txColor ? props.txColor : props.theme.bgColor)};
  text-align: center;
  font-weight: 700;
  font-size: ${props => (props.txSize ? props.txSize : "19")}px;
`;

const Button = ({
  text,
  onPress,
  loading = false,
  disabled = false,
  bgColor = null,
  txColor = null,
  txSize = null,
}) => (
  <Container disabled={disabled} onPress={onPress} bgColor={bgColor}>
    {loading ? (
      <ActivityIndicator color={"#FFFFFF"} />
    ) : (
      <Text txColor={txColor} txSize={txSize}>
        {text}
      </Text>
    )}
  </Container>
);

export default Button;
