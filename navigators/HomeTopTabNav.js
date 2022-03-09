import React, { useContext } from "react";
import { Text } from "react-native";
import { ThemeContext } from "styled-components/native";
import { createMaterialCollapsibleTopTabNavigator } from "react-native-collapsible-tab-view";

import constants from "../constants";
import HomeHeader from "../components/Home/HomeHeader";
import Recipes from "../screens/HomeScreens/RecipesScreens/Recipes";
import ForYou from "../screens/HomeScreens/ForYouScreens/ForYou";
import Subscribes from "../screens/HomeScreens/SubscribesScreens/Subscribes";
import Test from "../screens/HomeScreens/TestScreens/index";

const FONT_SIZE = 17;
const FONT_WEIGHT = "bold";

const NEWRECIPES = ({ navigation, route }) => (
  <Recipes navigation={navigation} route={route} />
);
const FORYOU = ({ navigation, route }) => (
  <ForYou navigation={navigation} route={route} />
);
const SUBSCRIBES = ({ navigation, route }) => (
  <Subscribes navigation={navigation} route={route} />
);
const TEST = ({ navigation, route }) => (
  <Test navigation={navigation} route={route} />
);

const Tabs = createMaterialCollapsibleTopTabNavigator();

export default ({ headerHeight, setHeaderHeight, goToNotification }) => {
  const themeContext = useContext(ThemeContext);
  const HOMEHEADER = () => {
    return (
      <HomeHeader
        setHeaderHeight={setHeaderHeight}
        goToNotification={goToNotification}
      />
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
          marginBottom: 3,
          marginLeft: 5,
        },
        tabBarItemStyle: {
          width: "auto",
          paddingHorizontal: 12,
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
                  : themeContext.blackColor + "55",
              }}
            >
              레시피
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
                  : themeContext.blackColor + "55",
              }}
            >
              For You
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="test"
        component={TEST}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: FONT_SIZE,
                fontWeight: FONT_WEIGHT,
                color: focused
                  ? themeContext.yellowColor
                  : themeContext.blackColor + "55",
              }}
            >
              테스트
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
                  : themeContext.blackColor + "55",
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
