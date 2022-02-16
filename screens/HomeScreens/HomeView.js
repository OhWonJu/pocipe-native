import React from "react";
import styled from "styled-components/native";

import constants from "../../constants";
import HomeTopTabNav from "../../navigators/HomeTopTabNav";

const StatusBar = styled.View`
  background-color: ${props => props.theme.bgColor};
  height: ${constants.statusBarHeight}px;
  z-index: 999;
`;

export default HomeView = ({
  headerHeight,
  setHeaderHeight,
  goToNotification,
}) => {
  return (
    <>
      <StatusBar />
      <HomeTopTabNav
        headerHeight={headerHeight}
        setHeaderHeight={setHeaderHeight}
        goToNotification={goToNotification}
      />
    </>
  );
};
