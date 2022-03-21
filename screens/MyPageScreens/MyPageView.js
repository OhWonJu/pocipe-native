import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled, { ThemeContext } from "styled-components/native";

import Button from "../../components/Button";
import CommonHeader from "../../components/CommonHeader";
import Container from "../../components/Container";
import { FilledNoticStar, FilledBookMark } from "../../components/Icons";
import ProfilePhoto from "../../components/ProfilePhoto";

import { shadows } from "../../Styles/GlobalStyles";

const ProfileBox = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 15px;
`;

const PublicOps = styled.Text`
  border-radius: 5px;
  padding: 2px 5px 2px 5px;
  top: 4px;
  text-align: center;
  background-color: ${props => props.theme.lightGreyColor};
  color: ${props => props.theme.darkGreyColor};
  font-size: 10px;
  margin-right: 5px;
`;

const UserName = styled.Text`
  font-weight: bold;
  font-size: 28px;
  text-align: center;
  color: ${props => props.theme.yellowColor};
`;
const BioBox = styled.View`
  max-width: 80%;
  padding: 5px 10px 5px 10px;
`;
const Bio = styled.Text`
  font-size: 12px;
  color: ${props => props.theme.darkGreyColor};
`;

const RatingBox = styled.View`
  max-width: 80%;
  padding: 2px 10px 5px 10px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
`;
const RatingText = styled.Text`
  font-size: 8px;
  font-weight: bold;
  color: ${props => props.theme.yellowColor};
`;
const ContentInfoBox = styled.View`
  flex-direction: row;
  width: 100%;
  height: 70px;
  border: ${props => props.theme.boxBorder};
  border-radius: 15px;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 15px;
`;
const InfoColBox = styled.View`
  padding: 3px;
`;
const InfoTopText = styled.Text`
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  color: ${props => props.theme.blackColor};
`;
const InfoBtmText = styled.Text`
  text-align: center;
  font-size: 12px;
  color: ${props => props.theme.blackColor};
`;

const RowBox = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  /* margin-top: ${props => (props.marginTop ? props.marginTop : 10)}px; */
  margin-top: 10px;
  /* background-color: rgba(80, 100, 5, 0.5); */
`;
const IconWrapper = styled.View`
  justify-content: center;
  margin-right: 2px;
`;

const BTN_WEIGHT = "47%";
const BTN_HEIGHT = "47px";

export default MyPageView = ({
  userName,
  profilePhoto,
  bio,
  totalStar,
  subscribersCount,
  subscribingsCount,
  recipes,
}) => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();

  const INFOBOX = ({ topTx, bottomTx, onPress = null }) => (
    <InfoColBox>
      <TouchableOpacity onPress={onPress}>
        <InfoTopText>{topTx}</InfoTopText>
        <InfoBtmText>{bottomTx}</InfoBtmText>
      </TouchableOpacity>
    </InfoColBox>
  );
  const BUTTON = ({ text, icon = null, onPress = null }) => (
    <Button
      text={text}
      icon={icon}
      onPress={onPress}
      bgColor={themeContext.lightGreyColor}
      txColor={themeContext.blackColor}
      width={BTN_WEIGHT}
      height={BTN_HEIGHT}
      txSize={15}
    />
  );

  const STAR = (
    <IconWrapper>
      <FilledNoticStar size={18} color={themeContext.yellowColor} />
    </IconWrapper>
  );
  const DIP = (
    <IconWrapper>
      <FilledBookMark size={13} color={themeContext.redColor} />
    </IconWrapper>
  );

  return (
    <>
      <CommonHeader
        navigation={navigation}
        type={"MyPage"}
        title={"마이페이지"}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        // {...scrollPropsAndRef}
        bounces={false}
      >
        <Container>
          <ProfileBox>
            <View style={shadows.photoWrapper}>
              <ProfilePhoto uri={profilePhoto} size={"profile"} />
            </View>
            <RowBox>
              <PublicOps>공개</PublicOps>
              <UserName>{userName}</UserName>
            </RowBox>
            <BioBox>
              <Bio>{bio}</Bio>
            </BioBox>
            <RatingBox>
              <FilledNoticStar size={15} color={themeContext.yellowColor} />
              <RatingText numberOfLines={1} ellipsizeMode="tail">
                X{totalStar}
              </RatingText>
            </RatingBox>
          </ProfileBox>
          <ContentInfoBox>
            <INFOBOX topTx={subscribersCount} bottomTx={"구독자"} />
            <INFOBOX topTx={subscribingsCount} bottomTx={"구독중"} />
            <INFOBOX
              topTx={recipes.length}
              bottomTx={"레시피"}
              onPress={() =>
                navigation.navigate("RecipeList", {
                  title: "내 레시피",
                  listId: recipes.map(recipe => recipe.id),
                })
              }
            />
          </ContentInfoBox>
          <RowBox>
            <BUTTON
              text={"별점"}
              icon={STAR}
              onPress={() =>
                navigation.navigate("RecipeList", {
                  title: "별점",
                  listId: "",
                })
              }
            />
            <BUTTON
              text={"찜"}
              icon={DIP}
              onPress={() =>
                navigation.navigate("RecipeList", {
                  title: "찜",
                  listId: "",
                })
              }
            />
          </RowBox>
          <RowBox>
            <BUTTON
              text={"최근 본 레시피"}
              onPress={() => navigation.navigate("RecipeList")}
            />
            <BUTTON
              text={"자주 본 레시피"}
              onPress={() => navigation.navigate("RecipeList")}
            />
          </RowBox>
          <View style={{ height: 500, backgroundColo: "red" }}></View>
        </Container>
      </ScrollView>
    </>
  );
};
