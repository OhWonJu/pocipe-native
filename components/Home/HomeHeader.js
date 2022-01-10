import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  flex-direction: row;
  background-color: ${props => props.theme.bgColor};
  /* background-color: #f6b93b; */
  height: 55px;
  width: 100%;
  justify-content: center;
  align-items: center;
  /* border-style: solid;
  border-bottom-color: ${props => props.theme.greyColor};
  border-bottom-width: 1.5px; */
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
const TouchableWithoutFeedback = styled.TouchableWithoutFeedback`
  width: 100%;
  height: 100%;
`;
const Logo = styled.Image`
  left: 15px;
  width: 150%;
  height: 100%;
`;

export default HomeHeader = ({ leftOnPress = () => null }) => {
  return (
    <Container>
      <Left>
        <TouchableWithoutFeedback onPress={leftOnPress}>
          <Logo
            source={require("../../assets/loadingPage/Logo-yellow.png")}
            resizeMode="contain"
          />
        </TouchableWithoutFeedback>
      </Left>
      <Mid></Mid>
      <Right></Right>
    </Container>
  );
};
