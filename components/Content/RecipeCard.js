import React, { useContext } from "react";
import { TouchableWithoutFeedback } from "react-native";
import styled, { ThemeContext } from "styled-components/native";

import { FilledNoticStar } from "../Icons";

const CARD_WIDTH = 160;

const CardContainer = styled.View`
  max-height: 240px;
  width: ${CARD_WIDTH}px;
  margin: 0px 10px 0px 10px;
`;
const ThumbNailBox = styled.View`
  width: ${CARD_WIDTH}px;
  height: ${CARD_WIDTH}px;
`;
const ThumbImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;
const InfoBox = styled.View`
  height: 80px;
  padding-top: 5px;
`;

const TitleText = styled.Text`
  font-weight: bold;
  font-size: 15px;
  color: ${props => props.theme.blackColor};
`;
const UserNameText = styled.Text`
  color: ${props => props.theme.darkGreyColor};
`;

export default ({ item: recipe, navigation, route }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate("RecipeDetail", { recipeId: recipe.id })
      }
    >
      <CardContainer>
        <ThumbNailBox>
          <ThumbImage
            source={{ uri: recipe.thumbNails[0] }}
            resizeMode={"cover"}
          />
        </ThumbNailBox>
        <InfoBox>
          <TitleText numberOfLines={1} ellipsizeMode="tail">
            {recipe.title}
          </TitleText>
          <FilledNoticStar size={15} color={themeContext.yellowColor} />
          <UserNameText numberOfLines={1} ellipsizeMode="tail">
            {recipe.chef.userName}
          </UserNameText>
        </InfoBox>
      </CardContainer>
    </TouchableWithoutFeedback>
  );
};
