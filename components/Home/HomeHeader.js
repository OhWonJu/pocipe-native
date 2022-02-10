import React from "react";
import styled from "styled-components/native";

import { userSignOut } from "../../apollo";

const Container = styled.View`
  background-color: ${props => props.theme.bgColor};
`;

const HeaderBox = styled.View`
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
const ScrollView = styled.ScrollView`
  /* background-color: ${props => props.theme.bgColor}; */
`;
const Reconmmend = styled.View`
  height: 200px;
  justify-content: center;
  background-color: ${props => props.theme.bgColor};
  margin: 10px 0px 5px 0px;
`;
const Box = styled.View`
  width: 300px;
  height: 200px;
  margin: 0px 10px 0px 10px;
  background-color: ${props => props.color};
  border-radius: 25px;
`;

export default HomeHeader = () => {
  const signOut = async () => await userSignOut();

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
    <Container >
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
        <Right></Right>
      </HeaderBox>
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
    </Container>
  );
};
