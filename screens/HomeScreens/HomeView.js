import React from "react";
import styled from "styled-components/native";

import constants from "../../constants";
import HomeTopTabNav from "../../navigators/HomeTopTabNav";


export default HomeView = ({
  headerHeight,
  setHeaderHeight,
  goToNotification,
}) => {
  return (
    <>
      <HomeTopTabNav
        headerHeight={headerHeight}
        setHeaderHeight={setHeaderHeight}
        goToNotification={goToNotification}
      />
    </>
  );
};
