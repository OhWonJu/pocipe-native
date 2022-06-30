import React, { useCallback, useContext, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

import Container from "../../components/Container";
import constants from "../../constants";
import ProfilePhoto from "../../components/ProfilePhoto";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";

const ITEM_WIDTH = constants.width;
const ITEM_HEIGHT = constants.width;

const Header = styled.View`
  flex-direction: row;
  position: absolute;
  height: 60px;
  padding-top: 5px;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
  justify-content: center;
  align-items: center;
  z-index: 999;
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

const CaroselWrapper = styled.View`
  height: ${ITEM_HEIGHT}px;
  overflow: hidden;
`;
const Image = styled.Image`
  width: ${ITEM_WIDTH}px;
  height: ${ITEM_HEIGHT}px;
`;

const PaginationBox = styled.View`
  position: absolute;
  top: ${ITEM_HEIGHT / 1.1}px;
  width: 100%;
  align-items: center;
  z-index: 999;
`;
const Pagination = styled.View`
  background-color: ${(props) => props.bgColor};
  padding: 5px 10px 5px 10px;
  border-radius: 30px;
`;

const PageIndex = styled.Text`
  font-weight: bold;
  font-size: 12px;
  color: ${(props) => props.fontColor};
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

  const [index, setIndex] = useState(0);

  const _onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
    setIndex(parseInt(changed[0].index));
  }, []);
  const _viewabilityConfig = {
    itemVisiblePercentThreshold: ITEM_HEIGHT,
  };

  return (
    <View>
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
      <CaroselWrapper>
        <FlatList
          data={thumbNails}
          keyExtractor={(_, index) => index.toString()}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
          bounces={false}
          renderItem={({ item }) => {
            return (
              <View>
                <Image source={{ uri: item }} resizeMode="cover" />
              </View>
            );
          }}
          onViewableItemsChanged={_onViewableItemsChanged}
          viewabilityConfig={_viewabilityConfig}
        />
        {thumbNails?.length > 1 && (
          <PaginationBox>
            <Pagination bgColor={themeContext.blackColor + 70}>
              <PageIndex fontColor={themeContext.bgColor}>
                {index + 1}/{thumbNails?.length}
              </PageIndex>
            </Pagination>
          </PaginationBox>
        )}
      </CaroselWrapper>
    </View>
  );
};
