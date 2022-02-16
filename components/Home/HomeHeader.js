import React, { useCallback, useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";

import { userSignOut } from "../../apollo";
import constants from "../../constants";
import { NoticStar } from "../Icons";
import HomeCarousel from "./HomeCarousel";

const Container = styled.View`
  background-color: ${props => props.theme.bgColor};
`;

const HeaderBox = styled.View`
  flex-direction: row;
  height: 65px; /* commonHeader 60 + 5(padding) */
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
  padding-right: 20px;
  justify-content: center;
  align-items: flex-end;
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
const IconWrapper = styled.View`
  height: 100%;
  justify-content: center;
`;

export default HomeHeader = ({ setHeaderHeight, goToNotification }) => {
  const themeContext = useContext(ThemeContext);

  const headerOnLayout = useCallback(event => {
    const { height } = event.nativeEvent.layout;
    setHeaderHeight(height);
  }, []);

  const signOut = async () => await userSignOut();

  return (
    <Container onLayout={headerOnLayout} pointerEvents="box-none">
      <HeaderBox>
        <Left>
          <TouchableWithoutFeedback onPress={signOut}>
            <Logo
              source={require("../../assets/loadingPage/Logo-yellow.png")}
              resizeMode="contain"
            />
          </TouchableWithoutFeedback>
        </Left>
        <Mid></Mid>
        <Right>
          <TouchableWithoutFeedback onPress={goToNotification}>
            <IconWrapper style={{ height: "100%" }}>
              <NoticStar size={30} color={themeContext.blackColor} />
            </IconWrapper>
          </TouchableWithoutFeedback>
        </Right>
      </HeaderBox>
      <HomeCarousel />
    </Container>
  );
};
