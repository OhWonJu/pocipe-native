import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

import constants from "../constants";

const Container = styled.View`
  flex-direction: row;
  background-color: ${props => props.theme.bgColor};
  height: ${constants.statusBarHeight + 50}px;
  padding-top: ${constants.statusBarHeight + 10}px;
  width: 100%;
  justify-content: center;
  align-items: center;
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

const MidText = styled.Text`
  position: absolute;
  font-size: 20px;
  font-weight: 700;
  color: ${props => props.titleColor};
  left: 50%;
`;

export default AuthHeader = ({
  title = null,
  titleColor = "#F6B93B",
  tiltColor = "#F6B93B",
  leftOnPress = () => null,
}) => {
  return (
    <Container>
      <Left>
        <TouchableOpacity onPress={leftOnPress}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={35}
            color={tiltColor}
            style={{ paddingLeft: 25 }}
          />
        </TouchableOpacity>
      </Left>
      <Mid>
        <MidText titleColor={titleColor}>{title}</MidText>
      </Mid>
      <Right></Right>
    </Container>
  );
};
