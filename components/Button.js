import React from "react";
import styled from "styled-components/native";

const Container = styled.TouchableOpacity`
  background-color: ${props =>
    props.bgColor ? props.bgColor : props.theme.yellowColor};
  padding: 10px;
  border-radius: ${props => (props.radius ? props.radius : "10px")};
  width: ${props => (props.width ? props.width : "50%")};
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.disabled ? "0.5" : "1")};
`;
const Text = styled.Text`
  /* color: #ffffff; */
  color: ${props => (props.txColor ? props.txColor : props.theme.bgColor)};
  text-align: center;
  font-size: ${props => (props.txSize ? props.txSize : "12")}px;
`;

const Button = ({
  text,
  onPress,
  disable = false,
  width,
  bgColor = null,
  txColor = null,
  txSize = null,
  radius = null
}) => (
  <Container
    disabled={disable}
    onPress={onPress}
    bgColor={bgColor}
    width={width}
    radius={radius}
  >
    <Text txColor={txColor} txSize={txSize}>
      {text}
    </Text>
  </Container>
);

export default Button;
