import React, { useContext } from "react";
import { Text } from "react-native";
import { createMaterialCollapsibleTopTabNavigator } from "react-native-collapsible-tab-view";

import RecipeToDo from "../screens/RecipeDetailScreens/RecipeToDoScreen/RecipeToDo";
import RecipeComment from "../screens/RecipeDetailScreens/RecipeCommentScreen/RecipeComment";
import RecipeStar from "../screens/RecipeDetailScreens/RecipeStarScreen/RecipeStar";
import RecipeShop from "../screens/RecipeDetailScreens/RecipeShopScreen/RecipeShop";
import { ThemeContext } from "styled-components/native";
import constants from "../constants";

const FONT_SIZE = 17;
const FONT_WEIGHT = "bold";

const TODO = ({ navigation, route }) => (
  <RecipeToDo navigation={navigation} route={route} />
);
const COMMENT = ({ navigation, route }) => (
  <RecipeComment navigation={navigation} route={route} />
);
const STAR = ({ navigation, route }) => (
  <RecipeStar navigation={navigation} route={route} />
);
const SHOP = ({ navigation, route }) => (
  <RecipeShop navigation={navigation} route={route} />
);

const Tabs = createMaterialCollapsibleTopTabNavigator();

export default ({ recipeId, InfoHeader, headerHeight }) => {
  const themeContext = useContext(ThemeContext);

  const HOMEHEADER = () => {
    return <InfoHeader />;
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
          marginHorizontal: 20,
          borderColor: themeContext.lightGreyColor,
          borderBottomWidth: 1,
          elevation: 0,
        },
        tabBarContentContainerStyle: {},
        tabBarItemStyle: {},
        tabBarActiveTintColor: themeContext.yellowColor,
        tabBarIndicatorContainerStyle: {},
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
        name="RecipeToDo"
        component={TODO}
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
        name="RecipeComment"
        component={COMMENT}
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
              댓글
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="RecipeStar"
        component={STAR}
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
              Star
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="RecipeShop"
        component={SHOP}
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
              Shop
            </Text>
          ),
        }}
      />
    </Tabs.Navigator>
  );
};
