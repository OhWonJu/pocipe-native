import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainBottomTabNav from "./MainBottomTabNav";
import RecipeDetail from "../screens/RecipeDetailScreens/RecipeDetail";
import Profile from "../screens/Profile";

const Stacks = createNativeStackNavigator();

export default () => {
  return (
    <Stacks.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stacks.Screen name="MainBottomTabNav" component={MainBottomTabNav} />
      <Stacks.Screen name="Profile" component={Profile} />
      <Stacks.Screen name="RecipeDetail" component={RecipeDetail} />
    </Stacks.Navigator>
  );
};
