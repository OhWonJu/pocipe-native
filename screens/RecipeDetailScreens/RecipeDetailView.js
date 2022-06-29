import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import Carousel from "react-native-snap-carousel"; // problem....
import { MaterialIcons } from "@expo/vector-icons";

import Container from "../../components/Container";
import constants from "../../constants";
import ProfilePhoto from "../../components/ProfilePhoto";
import { useNavigation } from "@react-navigation/native";

//https://github.com/meliorence/react-native-snap-carousel

const Header = styled.View`
  flex-direction: row;
  position: absolute;
  /* background-color: red; */
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
const PaginationBox = styled.View`
  position: absolute;
  top: ${constants.height / 1.59}px;
  width: 100%;
  align-items: center;
`;
const Pagination = styled.View`
  background-color: ${props => props.bgColor};
  padding: 5px 10px 5px 10px;
  border-radius: 30px;
`;

const PageIndex = styled.Text`
  font-weight: bold;
  font-size: 12px;
  color: ${props => props.fontColor};
`;

const IconWrapper = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  justify-content: center;
  align-items: center;
  transform: rotate(-90deg);
`;

export default RecipeDetailView = ({
  goBack,
  goProfile,
  id,
  title,
  caption,
  thumbNails,
  chef,
  servings,
  difficulty,
  cookingTime,
  kategories,
  ingredients,
}) => {
  const themeContext = useContext(ThemeContext);

  const [activeSlide, setActive] = useState(0);

  const renderItem = ({ item: uri, index }) => {
    return (
      <View
        style={{
          minHeight: constants.height / 1.5,
        }}
      >
        <Image
          source={{ uri }}
          style={{
            height: constants.width,
            width: constants.width,
          }}
          resizeMode="cover"
        />
      </View>
    );
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Carousel
          // ref={c => {
          //   this._carousel = c;
          // }}
          layout={"default"}
          data={thumbNails}
          renderItem={renderItem}
          sliderWidth={constants.width}
          itemWidth={constants.width}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          enableMomentum={false}
          decelerationRate={0}
          onSnapToItem={index => setActive(index)}
        />
        {thumbNails?.length > 1 && (
          <PaginationBox>
            <Pagination bgColor={themeContext.blackColor + 70}>
              <PageIndex fontColor={themeContext.bgColor}>
                {activeSlide + 1}/{thumbNails?.length}
              </PageIndex>
            </Pagination>
          </PaginationBox>
        )}
        {/* 헤더 */}
        <Header>
          <Left>
            <IconWrapper onPress={goBack}>
              <MaterialIcons
                name="keyboard-arrow-left"
                size={38}
                color={themeContext.blackColor}
              />
            </IconWrapper>
          </Left>
          <Right></Right>
        </Header>
        {/* 딥 버튼 */}
        <View
          style={{
            height: 60,
            width: 60,
            top: constants.height / 1.57,
            left: "80%",
            zIndex: 999,
            position: "absolute",
            backgroundColor: "red",
            borderRadius: 30,
          }}
        ></View>
        {/* Infos */}
        <View
          style={{
            height: constants.height - constants.height / 1.5,
            backgroundColor: "green",
          }}
        ></View>
        <Container>
          <View
            style={{
              flex: 1,
              minHeight: constants.height,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Recipe Details! 💚</Text>
            <Text>{id}</Text>
            <Text>{title}</Text>
            <Text>{caption}</Text>
            <Text>{servings}</Text>
            <Text>{difficulty}</Text>
            <Text>{cookingTime}</Text>
            {kategories.map(obj => (
              <Text key={obj.kategorie}>{obj.kategorie}</Text>
            ))}
            {ingredients.map(obj => (
              <Text key={obj.ingredient}>{obj.ingredient}</Text>
            ))}
            <TouchableOpacity onPress={goProfile}>
              <Text>{chef.userName}</Text>
              <ProfilePhoto size="large" uri={chef.profilePhoto} />
            </TouchableOpacity>
          </View>
        </Container>
      </ScrollView>
    </>
  );
};
