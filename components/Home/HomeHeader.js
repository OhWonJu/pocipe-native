import React from "react";
import styled from "styled-components/native";

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
const TouchableOpacity = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
`;
const Logo = styled.Image`
  left: 20px;
  width: 150%;
  height: 100%;
`;

export default HomeHeader = ({ leftOnPress = () => null }) => {
  return (
    <Container>
      <Left>
        <TouchableOpacity onPress={leftOnPress}>
          <Logo
            source={require("../../assets/loadingPage/Logo-yellow.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Left>
      <Mid></Mid>
      <Right></Right>
    </Container>
  );
};
