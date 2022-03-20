import React, { useContext } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { SharedElement } from "react-native-shared-element";
import styled, { ThemeContext } from "styled-components/native";

import { FilledNoticStar } from "../Icons";
import ProfilePhoto from "../ProfilePhoto";

const CARD_WIDTH = 160;

const CardContainer = styled.View`
  /* max-height: 340px; */
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
  /* height: 80px; */
  /* padding-top: 5px; */
`;

const TitleText = styled.Text`
  font-weight: bold;
  font-size: 15px;
  color: ${props => props.theme.blackColor};
  padding: 5px 0px 3px 0px;
`;
const RowBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const RowText = styled.Text`
  font-size: 12px;
  color: ${props => props.theme.darkGreyColor};
`;
const RatingBox = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
`;
const RatingText = styled.Text`
  font-size: 8px;
  font-weight: bold;
  color: ${props => props.theme.yellowColor};
`;
const UserNameText = styled.Text`
  margin-left: 3px;
  color: ${props => props.theme.darkGreyColor};
`;
const ProfileBox = styled.View`
  flex-direction: row;
  align-items: baseline;
  padding-top: 3px;
  padding-bottom: 2px;
`;

export default ({ item: recipe, navigation, route }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate("RecipeDetail", {
          recipeId: recipe.id,
        })
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
          <RatingBox>
            <FilledNoticStar size={15} color={themeContext.yellowColor} />
            <RatingText>{`X${recipe.starAverage.toFixed(1)}`}</RatingText>
          </RatingBox>

          <RowBox>
            <RowText>Servings</RowText>
            <RowText>{recipe.servings}</RowText>
          </RowBox>
          <RowBox>
            <RowText>Difficulty</RowText>
            <RowText>{recipe.difficulty}</RowText>
          </RowBox>
          <RowBox>
            <RowText>CookingTime</RowText>
            <RowText>
              {`${Math.floor(recipe.cookingTime / (1000 * 60))} min`}
            </RowText>
          </RowBox>
          <ProfileBox>
            <ProfilePhoto size="small" uri={recipe.chef.profilePhoto} />
            <UserNameText numberOfLines={1} ellipsizeMode="tail">
              {recipe.chef.userName}
            </UserNameText>
          </ProfileBox>
        </InfoBox>
      </CardContainer>
    </TouchableWithoutFeedback>
  );
};
