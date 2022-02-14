import React, { useCallback, useContext, useEffect, useState } from "react";
import { Text } from "react-native";
import { ThemeContext } from "styled-components/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import NewRecipes from "../screens/HomeScreens/NewRecipesScreens/NewRecipes";
import ForYou from "../screens/HomeScreens/ForYouScreens/ForYou";
import Subscribes from "../screens/HomeScreens/SubscribesScreens/Subscribes";
import constants from "../constants";

const FONT_SIZE = 17;
const FONT_WEIGHT = "bold";
// 상수는 컴포넌트 내에서만 존재하나벼
// props로 넘어가면 잃어버리는둣,,?

const Tabs = createMaterialTopTabNavigator();

export default ({
  headerHeight,
  scrollY,
  tabBarTranslateY,
  onMomentumScrollBegin,
  onMomentumScrollEnd,
  onScrollEndDrag,
  tabRoutes,
  tabIndex,
  setTabRoutes,
  onTabIndexChange,
  onTabPress,
  listArrRef,
}) => {
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    setTabRoutes(["NewRecipes", "ForYou", "Subscribes"]);
  }, []);

  const NEWRECIPES = ({ navigation, route }) => (
    <NewRecipes
      navigation={navigation}
      route={route}
      idx={0}
      tabRoutes={tabRoutes}
      tabIndex={tabIndex}
      listArrRef={listArrRef}
      headerHeight={headerHeight}
      scrollY={scrollY}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onMomentumScrollEnd={onMomentumScrollEnd}
      onScrollEndDrag={onScrollEndDrag}
      onTabIndexChange={onTabIndexChange}
      onTabPress={onTabPress}
    />
  );
  const FORYOU = ({ navigation, route }) => (
    <ForYou
      navigation={navigation}
      route={route}
      idx={1}
      tabRoutes={tabRoutes}
      tabIndex={tabIndex}
      listArrRef={listArrRef}
      headerHeight={headerHeight}
      scrollY={scrollY}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onMomentumScrollEnd={onMomentumScrollEnd}
      onScrollEndDrag={onScrollEndDrag}
      onTabIndexChange={onTabIndexChange}
      onTabPress={onTabPress}
    />
  );
  const SUBSCRIBES = ({ navigation, route }) => (
    <Subscribes
      navigation={navigation}
      route={route}
      idx={2}
      tabRoutes={tabRoutes}
      tabIndex={tabIndex}
      listArrRef={listArrRef}
      headerHeight={headerHeight}
      scrollY={scrollY}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onMomentumScrollEnd={onMomentumScrollEnd}
      onScrollEndDrag={onScrollEndDrag}
      onTabIndexChange={onTabIndexChange}
      onTabPress={onTabPress}
    />
  );

  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: themeContext.bgColor,
          borderBottomWidth: 0,
          elevation: 0, // 그림자 제거 - 고도 옵션이라.....0이면 딱 달라붙어있는 너낌?
          transform: [{ translateY: tabBarTranslateY }],
        },
        tabBarContentContainerStyle: {
          width: constants.width,
          marginBottom: 4,
          marginLeft: 5,
        },
        tabBarItemStyle: {
          width: "auto",
          paddingHorizontal: 15,
        },
        tabBarActiveTintColor: themeContext.yellowColor,
        tabBarIndicatorContainerStyle: {
          // width: constants.width,
          marginLeft: 5,
          // 버그수준인디? ㅋㅋㅋ
          borderColor: "rgba(0, 0, 0, 0)",
          borderWidth: 1,
        },
        tabBarIndicatorStyle: {
          borderBottomColor: themeContext.yellowColor,
          borderBottomWidth: 2,
        },
        tabBarPressColor: "rgba(0, 0, 0, 0)",
      }}
      backBehavior="none"
    >
      <Tabs.Screen
        name="NewRecipes"
        component={NEWRECIPES}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: FONT_SIZE,
                fontWeight: FONT_WEIGHT,
                color: focused
                  ? themeContext.yellowColor
                  : themeContext.yellowColor + "66",
              }}
            >
              New
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="ForYou"
        component={FORYOU}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: FONT_SIZE,
                fontWeight: FONT_WEIGHT,
                color: focused
                  ? themeContext.yellowColor
                  : themeContext.yellowColor + "66",
              }}
            >
              For You
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="Subscribes"
        component={SUBSCRIBES}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: FONT_SIZE,
                fontWeight: FONT_WEIGHT,
                color: focused
                  ? themeContext.yellowColor
                  : themeContext.yellowColor + "66",
              }}
            >
              구독
            </Text>
          ),
        }}
      />
    </Tabs.Navigator>
  );
};
