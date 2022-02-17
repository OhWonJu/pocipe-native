import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionSpecs,
} from "@react-navigation/stack";

import Home from "../screens/HomeScreens/index";
import Search from "../screens/Search";
import Market from "../screens/Market";
import MyPage from "../screens/MyPage";

import Profile from "../screens/Profile";
import Notification from "../screens/HomeScreens/NotificationScreens/Notification";

const Stacks = createStackNavigator();

const verticallTransition = {
  gestureDirection: "vertical-inverted",
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
};

export default ({ screenName }) => {
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
      <Stacks.Screen
        name="Profile"
        component={Profile}
        options={{
          //presentation: "modal",
          // ...verticallTransition,
        }}
      />
      <Stacks.Screen
        name="Notification"
        component={Notification}
        options={{
          presentation: "card",
          ...verticallTransition,
        }}
      />
    </Stacks.Navigator>
  );
};
