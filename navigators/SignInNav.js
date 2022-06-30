import React, { useContext } from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext } from "styled-components/native";

import { verticallTransition } from "./NavigationOptions";
import MainBottomTabNav from "./MainBottomTabNav";

const Stacks = createStackNavigator();

export default () => {
  const insets = useSafeAreaInsets();
  const themeContext = useContext(ThemeContext);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: themeContext.bgColor,
      }}
    >
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
      </Stacks.Navigator>
    </View>
  );
};
