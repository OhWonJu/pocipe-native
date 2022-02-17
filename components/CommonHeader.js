import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { EvilIcons } from "@expo/vector-icons";

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
  flex: 1;
  justify-content: center;
  /* align-items: center; */
`;
const Right = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
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
  height: 40px;
  justify-content: center;
`;

export default CommonHeader = ({
  navigation,
  type = "default",
  title = null,
  titleColor = "#F6B93B",
  leftOnPress = () => null,
}) => {
  const themeContext = useContext(ThemeContext);

  const goToNotification = () => navigation.navigate("Notification");
  if (type === "default") {
    return (
      <Container>
        <Left>
          <Title titleColor={titleColor}>{title}</Title>
        </Left>
        <Right>
          <TouchableWithoutFeedback onPress={goToNotification}>
            <IconWrapper>
              <NoticStar size={28} color={themeContext.blackColor} />
            </IconWrapper>
          </TouchableWithoutFeedback>
        </Right>
      </Container>
    );
  } else {
    return (
      <Container>
        <Left>
          <Title titleColor={titleColor}>{title}</Title>
        </Left>
        <Right>
          <TouchableWithoutFeedback onPress={goToNotification}>
            <EvilIcons name="gear" size={30} color={themeContext.blackColor} />
          </TouchableWithoutFeedback>
        </Right>
      </Container>
    );
  }
};
