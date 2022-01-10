import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screens/Home";
import Search from "../screens/Search";
import Profile from "../screens/Profile";
import OptionMenu from "../screens/OptionMenu";

const Tabs = createBottomTabNavigator();

export default () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        //headerShown: false,
        gestureEnabled: true,
        headerShown: false,
      }}
    >
      <Tabs.Screen name={"Home"} component={Home} />
      <Tabs.Screen name={"Search"} component={Search} />
      <Tabs.Screen name={"Profile"} component={Profile} />
      <Tabs.Screen name={"OptionMenu"} component={OptionMenu} />
    </Tabs.Navigator>
  );
};
