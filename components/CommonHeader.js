import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";

import constants from "../constants";
import { NoticStar } from "./Icons";

const Container = styled.View`
  flex-direction: row;
  background-color: ${props => props.theme.bgColor};
  height: ${constants.statusBarHeight + 60}px;
  padding-top: ${constants.statusBarHeight + 5}px;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const Left = styled.View`
  justify-content: center;
  /* align-items: center; */
`;
const Mid = styled.View`
  flex: 4;
  justify-content: center;
  align-items: center;
`;
const Right = styled.View`
  flex: 2;
  justify-content: center;
  align-items: flex-end;
`;

const Title = styled.Text`
  font-size: 23px;
  font-weight: 700;
  color: ${props => props.titleColor};
`;

const TouchableWithoutFeedback = styled.TouchableWithoutFeedback`
  width: 100%;
  height: 100%;
`;
const IconWrapper = styled.View`
  height: 100%;
  justify-content: center;
`;

export default CommonHeader = ({
  navigation,
  title = null,
  titleColor = "#F6B93B",
  leftOnPress = () => null,
}) => {
  const themeContext = useContext(ThemeContext);

  const goToNotification = () => navigation.navigate("Notification");
  return (
    <Container>
      <Left>
        <Title titleColor={titleColor}>{title}</Title>
      </Left>
      <Mid></Mid>
      <Right>
        <TouchableWithoutFeedback onPress={goToNotification}>
          <IconWrapper style={{ height: "100%" }}>
            <NoticStar size={30} color={themeContext.blackColor} />
          </IconWrapper>
        </TouchableWithoutFeedback>
      </Right>
    </Container>
  );
};
