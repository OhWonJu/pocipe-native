import React from "react";
import styled from "styled-components/native";

import HomeHeader from "../../components/Home/HomeHeader";
import constants from "../../constants";
import HomeTopTabNav from "../../navigators/HomeTopTabNav";

const StatusBar = styled.View`
  background-color: ${props => props.theme.bgColor};
  height: ${constants.statusBarHeight}px;
  z-index: 999;
`;

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.bgColor};
`;

export default HomeView = ({
  headerHeight,
  setHeaderHeight,
  scrollY,
  headerTranslateY,
  tabBarTranslateY,
  onMomentumScrollBegin,
  onMomentumScrollEnd,
  onScrollEndDrag,
}) => {
  return (
    <>
      <StatusBar />
      <Container>
        {headerHeight > 0 ? (
          <HomeTopTabNav
            headerHeight={headerHeight}
            scrollY={scrollY}
            tabBarTranslateY={tabBarTranslateY}
          />
        ) : null}
        <HomeHeader
          setHeaderHeight={setHeaderHeight}
          headerTranslateY={headerTranslateY}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
        />
      </Container>
    </>
  );
};
