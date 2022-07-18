import React, { useContext } from "react";
import { Text } from "react-native";
import { createMaterialCollapsibleTopTabNavigator } from "react-native-collapsible-tab-view";

import RecipeToDo from "../screens/RecipeDetailScreens/RecipeToDoScreen/index";
import RecipeComment from "../screens/RecipeDetailScreens/RecipeCommentScreen/RecipeComment";
import RecipeStar from "../screens/RecipeDetailScreens/RecipeStarScreen/RecipeStar";
import RecipeShop from "../screens/RecipeDetailScreens/RecipeShopScreen/RecipeShop";
import { ThemeContext } from "styled-components/native";
import TabBar from "../components/TabBar";

const FONT_SIZE = 17;
const FONT_WEIGHT = "bold";

const Tabs = createMaterialCollapsibleTopTabNavigator();

export default ({ recipeId, InfoHeader, headerHeight }) => {
  const themeContext = useContext(ThemeContext);

  const HOMEHEADER = () => {
    return <InfoHeader />;
  };

  const tabContext = [
    { key: 1, title: "레시피", name: "RecipeToDo", ref: React.createRef() },
    { key: 2, title: "댓글", name: "RecipeComment", ref: React.createRef() },
    { key: 3, title: "Star", name: "RecipeStar", ref: React.createRef() },
    { key: 4, title: "Shop", name: "RecipeShop", ref: React.createRef() },
  ];

  return (
    <Tabs.Navigator
      collapsibleOptions={{
        headerHeight: headerHeight,
        renderHeader: HOMEHEADER,
        disableSnap: true,
      }}
      // screenOptions={{
      //   tabBarStyle: {
      //     backgroundColor: themeContext.bgColor,
      //     marginHorizontal: 20,
      //     borderColor: themeContext.lightGreyColor,
      //     borderBottomWidth: 1,
      //     elevation: 0,
      //   },
      //   tabBarContentContainerStyle: {},
      //   tabBarItemStyle: {},
      //   tabBarActiveTintColor: themeContext.yellowColor,
      //   tabBarIndicatorContainerStyle: {},
      //   tabBarIndicatorStyle: {
      //     backgroundColor: themeContext.bgColor,
      //     borderBottomColor: themeContext.yellowColor,
      //     borderBottomWidth: 2,
      //   },
      //   tabBarPressColor: "rgba(0, 0, 0, 0)",
      // }}
      tabBar={({ navigation, state }) => (
        <TabBar
          data={tabContext}
          navigation={navigation}
          state={state}
          // tabContainerStyle={{justifyContent: "flex-start"}}
        />
      )}
      backBehavior="none"
    >
      <Tabs.Screen
        name="RecipeToDo"
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
      >
        {({ navigation, route }) => (
          <RecipeToDo
            navigation={navigation}
            route={route}
            recipeId={recipeId}
          />
        )}
      </Tabs.Screen>
      <Tabs.Screen
        name="RecipeComment"
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
      >
        {({ navigation, route }) => (
          <RecipeComment
            navigation={navigation}
            route={route}
            recipeId={recipeId}
          />
        )}
      </Tabs.Screen>
      <Tabs.Screen
        name="RecipeStar"
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
      >
        {({ navigation, route }) => (
          <RecipeStar
            navigation={navigation}
            route={route}
            recipeId={recipeId}
          />
        )}
      </Tabs.Screen>
      <Tabs.Screen
        name="RecipeShop"
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
      >
        {({ navigation, route }) => (
          <RecipeShop
            navigation={navigation}
            route={route}
            recipeId={recipeId}
          />
        )}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
};
