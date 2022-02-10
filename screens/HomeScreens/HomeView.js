import React from "react";
import styled from "styled-components/native";

import HomeHeader from "../../components/Home/HomeHeader";
import constants from "../../constants";
import HomeTopTabNav from "../../navigators/HomeTopTabNav";

const StatusBar = styled.View`
  background-color: ${props => props.theme.bgColor};
  height: ${constants.statusBarHeight}px;
`;

const HeaderBox = styled.View`
  elevation: 4;
`;

const Footer = styled.View`
  padding: 0px 20px 0px 20px;
  height: 200px;
  background-color: ${props => props.theme.bgColor};
  justify-content: center;
  align-items: center;
`;



export default HomeView = () => {
  return (
    <>
      <StatusBar />
      <HomeHeader />
      <HomeTopTabNav />
    </>
  );
};
