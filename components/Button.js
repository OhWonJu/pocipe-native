import React from "react";
import styled from "styled-components/native";

import constants from "../constants";
import { ActivityIndicator } from "react-native";

const Container = styled.TouchableOpacity`
  background-color: ${props =>
    props.bgColor ? props.bgColor : props.theme.yellowColor};
  padding: 10px;
  /* margin-bottom: 15px; */
  border-radius: 10px;
  width: ${props => (props.width ? props.width : "50%")};
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.disabled ? "0.5" : "1")};
`;
const Text = styled.Text`
  /* color: #ffffff; */
  color: ${props => (props.txColor ? props.txColor : props.theme.bgColor)};
  text-align: center;
`;

const Button = ({
  text,
  onPress,
  disable = false,
  width,
  bgColor = null,
  txColor = null,
}) => (
  <Container
    disabled={disable}
    onPress={onPress}
    bgColor={bgColor}
    width={width}
  >
    <Text txColor={txColor}>{text}</Text>
  </Container>
);

export default Button;
