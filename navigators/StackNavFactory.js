import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { verticallTransition, horizontalTransition } from "./NavigationOptions";

import Home from "../screens/HomeScreens/index";
import Search from "../screens/Search";
import Market from "../screens/Market";
import MyPage from "../screens/MyPageScreens/index";
import Profile from "../screens/Profile";
import RecipeDetail from "../screens/RecipeDetailScreens/index";
import RecipeList from "../screens/RecipeListScreens/index";
import Notification from "../screens/NotificationScreens/Notification";
import Setting from "../screens/MyPageScreens/SettingScreens/index";

const Stacks = createStackNavigator();

export default ({ screenName, setTabBarVisible }) => {
  return (
    <Stacks.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {screenName === "Home" ? (
        <Stacks.Screen name={"Home"} component={Home} />
      ) : null}
      {screenName === "Search" ? (
        <Stacks.Screen name={"Search"} component={Search} />
      ) : null}
      {screenName === "Market" ? (
        <Stacks.Screen name={"Market"} component={Market} />
      ) : null}
      {screenName === "MyPage" ? (
        <Stacks.Screen name={"MyPage"} component={MyPage} />
      ) : null}
      <Stacks.Screen name="Profile" component={Profile} />
      <Stacks.Screen
        name="RecipeDetail"
        options={{
          presentation: "card",
          ...verticallTransition,
          gestureDirection: "vertical",
          gestureEnabled: false,
        }}
      >
        {({ navigation, route }) => (
          <RecipeDetail
            navigation={navigation}
            route={route}
            setTabBarVisible={setTabBarVisible}
          />
        )}
      </Stacks.Screen>
      <Stacks.Screen
        name="RecipeList"
        component={RecipeList}
        options={{ animationEnabled: false }}
      />
      <Stacks.Screen
        name="Notification"
        component={Notification}
        options={{
          presentation: "card",
          ...verticallTransition,
          gestureDirection: "vertical-inverted",
        }}
      />
      <Stacks.Screen
        name="Setting"
        component={Setting}
        options={{
          presentation: "card",
          gestureEnabled: true,
          ...horizontalTransition,
        }}
      />
    </Stacks.Navigator>
  );
};
