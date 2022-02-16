import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionSpecs,
} from "@react-navigation/stack";

import MainBottomTabNav from "./MainBottomTabNav";
import RecipeDetail from "../screens/RecipeDetailScreens/RecipeDetail";
import Notification from "../screens/HomeScreens/NotificationScreens/Notification";

const Stacks = createStackNavigator();

const verticallTransition = {
  gestureDirection: "vertical-inverted",
  //gestureResponseDistance: 135, // default
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  //HeaderStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
};

export default () => {
  return (
    <Stacks.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stacks.Screen
        name="MainBottomTabNav"
        component={MainBottomTabNav}
        options={{
          presentation: "card",
          headerShown: false,
          ...verticallTransition,
        }}
      />
      <Stacks.Screen
        name="RecipeDetail"
        component={RecipeDetail}
        options={{
          presentation: "card",
          headerShown: false,
          ...verticallTransition,
        }}
      />
      <Stacks.Screen
        name="Notification"
        component={Notification}
        options={{
          presentation: "card",
          headerShown: false,
          ...verticallTransition,
        }}
      />
    </Stacks.Navigator>
  );
};
