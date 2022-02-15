import React, { useContext } from "react";
import { Text } from "react-native";
import { ThemeContext } from "styled-components/native";
import { createMaterialCollapsibleTopTabNavigator } from "react-native-collapsible-tab-view";
import styled from "styled-components/native";

import constants from "../constants";
import HomeHeader from "../components/Home/HomeHeader";
import NewRecipes from "../screens/HomeScreens/NewRecipesScreens/NewRecipes";
import ForYou from "../screens/HomeScreens/ForYouScreens/ForYou";
import Subscribes from "../screens/HomeScreens/SubscribesScreens/Subscribes";

const FONT_SIZE = 17;
const FONT_WEIGHT = "bold";

const NEWRECIPES = ({ route }) => <NewRecipes route={route} />;
const FORYOU = ({ route }) => <ForYou route={route} />;
const SUBSCRIBES = ({ route }) => <Subscribes route={route} />;

const Tabs = createMaterialCollapsibleTopTabNavigator();

export default ({
  headerHeight,
  setHeaderHeight,
  goToProfile,
  goToRecipeDetail,
}) => {
  const themeContext = useContext(ThemeContext);

  const HOMEHEADER = () => {
    return (
      <HomeHeader setHeaderHeight={setHeaderHeight} goToProfile={goToProfile} />
    );
  };

  return (
    <Tabs.Navigator
      collapsibleOptions={{
        headerHeight: headerHeight,
        renderHeader: HOMEHEADER,
        disableSnap: true,
      }}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: themeContext.bgColor,
          borderBottomWidth: 0,
          elevation: 0, // 그림자 제거 - 고도 옵션이라.....0이면 딱 달라붙어있는 너낌?
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
          backgroundColor: themeContext.bgColor,
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
