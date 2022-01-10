import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

import constants from "../../constants";

const Container = styled.View`
  flex-direction: row;
  background-color: ${props => props.theme.bgColor};
  height: ${constants.statusBarHeight + 55}px;
  padding-top: ${constants.statusBarHeight + 5}px;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-style: solid;
  border-bottom-color: ${props => props.theme.greyColor};
  border-bottom-width: 1.5px;
`;
const Left = styled.View`
  flex: 1;
`;
const Mid = styled.View`
  flex: 4;
  justify-content: center;
  align-items: center;
`;
const Right = styled.View`
  flex: 2;
`;

const Title = styled.Text`
  position: absolute;
  font-size: 23px;
  font-weight: 700;
  color: ${props => props.titleColor};
  bottom: 20%;
`;

export default AuthHeader = ({
  title = null,
  titleColor = "#F6B93B",
  tiltColor = "#F6B93B",
  leftOnPress = () => null,
}) => {
  return (
    <Container>
      <Title titleColor={titleColor}>{title}</Title>
      <Left>
        <TouchableOpacity onPress={leftOnPress}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={38}
            color={tiltColor}
            style={{ paddingLeft: 15 }}
          />
        </TouchableOpacity>
      </Left>
      <Mid>
      </Mid>
      <Right></Right>
    </Container>
  );
};
