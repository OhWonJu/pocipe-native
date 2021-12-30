import React from "react";
import styled from "styled-components/native";

import constants from "../constants";
import { ActivityIndicator } from "react-native";

const Container = styled.TouchableOpacity`
  background-color: ${props =>
    props.bgColor ? props.bgColor : props.theme.yellowColor};
  padding: 10px;
  margin: 3px 50px;
  height: 60px;
  border-radius: 10px;
  /* width: ${props =>
    props.widthPer
      ? constants.width / props.widthPer
      : constants.width / 1.2}px; */
  width: 100%;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.disable ? "0.5" : "1")};
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
  bgColor = null,
  txColor = null,
  txSize = null,
  disable = false,
}) => (
  <Container
    disabled={loading}
    onPress={onPress}
    bgColor={bgColor}
    disable={disable}
  >
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
