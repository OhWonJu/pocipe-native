import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { verticallTransition } from "./NavigationOptions";

import Home from "../screens/HomeScreens/index";
import Search from "../screens/Search";
import Market from "../screens/Market";
import MyPage from "../screens/MyPage";
import Profile from "../screens/Profile";
import RecipeDetail from "../screens/RecipeDetailScreens/index";
import Notification from "../screens/HomeScreens/NotificationScreens/Notification";

const Stacks = createSharedElementStackNavigator();

export default ({ screenName, setTabBarVisible }) => {
  return (
    <Stacks.Navigator
      initialRouteName={screenName}
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
        component={RecipeDetail}
        sharedElements={(route, otherRoute, showing) => {
          const id = `${route.params.recipeId}-0`;
          console.log("NAV", id);
          return [id];
        }}
      />

      {/* <Stacks.Screen
        name="RecipeDetail"
        sharedElements={(route, otherRoute, showing) => {
          const { item } = route.params;
          return [`item.${item.id}.photo`];
        }}
      >
        {({ navigation, route }) => (
          <RecipeDetail
            navigation={navigation}
            route={route}
            setTabBarVisible={setTabBarVisible}
          />
        )}
      </Stacks.Screen> */}
      <Stacks.Screen
        name="Notification"
        component={Notification}
        options={{
          presentation: "card",
          ...verticallTransition,
          gestureDirection: "vertical-inverted",
        }}
      />
    </Stacks.Navigator>
  );
};
