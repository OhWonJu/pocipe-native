import React from "react";
import { ScrollView, Text, View } from "react-native";
import styled from "styled-components/native";

import Container from "../components/Container";
import HomeHeader from "../components/Home/HomeHeader";
import constants from "../constants";

const StatusBar = styled.View`
  background-color: ${props => props.theme.bgColor};
  height: ${constants.statusBarHeight}px;
`;
const Reconmmend = styled.View`
  height: 200px;
  justify-content: center;
  background-color: ${props => props.theme.bgColor};
`;
const InnerHeader = styled.View`
  height: 50px;
  padding: 0px 20px 0px 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.bgColor};
`;
const Views = styled.View`
  min-height: ${constants.window.height * 2}px;
`;

const Box = styled.View`
  width: 300px;
  height: 200px;
  margin: 0px 10px 0px 10px;
  background-color: ${props => props.color};
  border-radius: 25px;
`;
const HeaderText = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${props => props.theme.yellowColor};
`;

// touchable 안에  scrollView가 배치되면 scroll이 먹통..
export default Home = () => {
  // 캐러셀 스크롤 뷰 데모
  const PAGES = [
    {
      num: 1,
      color: "#86E3CE",
    },
    {
      num: 2,
      color: "#D0E6A5",
    },
    {
      num: 3,
      color: "#FFDD94",
    },
    {
      num: 4,
      color: "#FA897B",
    },
    {
      num: 5,
      color: "#CCABD8",
    },
    {
      num: 6,
      color: "#F6B93B",
    },
  ];
  return (
    <>
      <StatusBar />
      <ScrollView
        stickyHeaderIndices={[2]}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader leftOnPress={() => alert("HI")} />
        <Reconmmend>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            decelerationRate={"fast"}
            snapToInterval={300 + 10}
            pagingEnabled={true}
          >
            {PAGES.map(page => (
              <Box key={page.num} color={page.color} />
            ))}
          </ScrollView>
        </Reconmmend>
        <InnerHeader>
          <HeaderText>Recent</HeaderText>
          <HeaderText>POCHELIN Guide</HeaderText>
          <HeaderText>For You</HeaderText>
        </InnerHeader>
        <Container>
          <Views>
            <Text>Home</Text>
          </Views>
        </Container>
      </ScrollView>
    </>
  );
};
