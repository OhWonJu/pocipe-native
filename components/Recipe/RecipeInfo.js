import React, { useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import constants from "../../constants";

import Barcode from "../Content/Barcode";
import ProfilePhoto from "../ProfilePhoto";

const InfoWrapper = styled.View`
  flex: 1;
`;
const CenteredBox = styled.View`
  justify-content: center;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom-width: 2px;
  border-color: ${(props) => props.blackColor};
`;
const Title = styled.Text`
  color: ${(props) => props.theme.blackColor};
  font-weight: bold;
  font-size: 35px;
`;
const Caption = styled.Text`
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 16px;
`;

const RowBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-top: 4px;
  padding-bottom: 4px;
`;
const RowText = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.darkGreyColor};
`;

const PureRowBox = styled.View`
  flex: 1;
`;
const TagTitle = styled.Text`
  text-align: center;
  color: ${(props) => props.theme.blackColor};
  font-size: 15px;
`;
const TagBox = styled.View`
  padding-top: 7px;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;
const TagTextBtn = styled.TouchableOpacity`
  margin: 2px;
  padding: 5px;
  background-color: ${(props) => props.theme.yellowColor};
  border-radius: 10px;
`;
const TagText = styled.Text`
  color: ${(props) => props.theme.bgColor};
`;

const TotalStar = styled.Text`
  color: ${(props) => props.theme.blackColor};
  font-weight: bold;
  font-size: 28px;
`;

const BarCodeWrapper = styled.View`
  height: 90px;
  padding-top: 5px;
`;
const BarcodeText = styled.Text`
  color: ${(props) => props.theme.blackColor};
  font-size: 13px;
`;

export default RecipeInfo = ({
  id,
  title,
  caption,
  chef,
  servings,
  difficulty,
  toDosCount,
  cookingTime,
  kategories,
  ingredients,
  totalStar,
  starAverage,
  commentsCount,
  givnStar,
  isMine,
  goProfile = { goProfile },
}) => {
  return (
    <InfoWrapper pointerEvents="box-none">
      <CenteredBox style={{ paddingTop: 0 }} pointerEvents="none">
        <Title>{title}</Title>
        <View style={{ paddingTop: 10 }}>
          <Caption>{caption}</Caption>
        </View>
      </CenteredBox>
      <CenteredBox pointerEvents="box-none">
        <RowBox pointerEvents="none">
          <RowText>serving</RowText>
          <RowText>{servings}</RowText>
        </RowBox>
        <RowBox pointerEvents="none">
          <RowText>difficulty</RowText>
          <RowText>{difficulty}</RowText>
        </RowBox>
        <RowBox pointerEvents="none">
          <RowText>steps</RowText>
          <RowText>{toDosCount}</RowText>
        </RowBox>
        <RowBox pointerEvents="none">
          <RowText>cookingTime</RowText>
          <RowText>{`${Math.floor(cookingTime / (1000 * 60))} min`}</RowText>
        </RowBox>
        <RowBox style={{ paddingTop: 15 }} pointerEvents="box-none">
          <PureRowBox style={{ paddingRight: 8 }} pointerEvents="box-none">
            <TagTitle>Kategories</TagTitle>
            <TagBox pointerEvents="box-none">
              {kategories.map((obj) => (
                <TagTextBtn key={obj.kategorie}>
                  <TagText>{obj.kategorie}</TagText>
                </TagTextBtn>
              ))}
            </TagBox>
          </PureRowBox>
          <PureRowBox style={{ paddingLeft: 8 }} pointerEvents="box-none">
            <TagTitle>ingredients</TagTitle>
            <TagBox pointerEvents="box-none">
              {ingredients.map((obj) => (
                <TagTextBtn key={obj.ingredient}>
                  <TagText>{obj.ingredient}</TagText>
                </TagTextBtn>
              ))}
            </TagBox>
          </PureRowBox>
        </RowBox>
      </CenteredBox>
      <CenteredBox style={{ borderBottomWidth: 0 }} pointerEvents="none">
        <RowBox>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between",
              paddingRight: 8,
            }}
          >
            <RowText>StarAverage</RowText>
            <RowText>{starAverage}</RowText>
          </View>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between",
              paddingLeft: 8,
            }}
          >
            <RowText>Comment</RowText>
            <RowText>{commentsCount}</RowText>
          </View>
        </RowBox>
        <RowBox style={{ paddingTop: 20 }}>
          <TotalStar>TOTAL STAR</TotalStar>
          <TotalStar>{totalStar}</TotalStar>
        </RowBox>
      </CenteredBox>
      <BarCodeWrapper pointerEvents="none">
        <Barcode id={id} />
      </BarCodeWrapper>
      <View
        style={{
          height: 60,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 10,
        }}
        pointerEvents="box-none"
      >
        <View style={{ paddingRight: 3 }} pointerEvents="none">
          <BarcodeText>Recipe by {chef.userName}</BarcodeText>
        </View>
        <TouchableOpacity
          onPress={goProfile}
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <ProfilePhoto size="normal" uri={chef.profilePhoto} />
        </TouchableOpacity>
      </View>
    </InfoWrapper>
  );
};
