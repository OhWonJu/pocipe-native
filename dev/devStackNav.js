import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DevMain from "./devMainView";
import Wave from "./wave/Main";
import Rise from "./rise/Main";

const Stacks = createStackNavigator();

export default () => {
  return (
    <Stacks.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stacks.Screen name="main" component={DevMain} />
      <Stacks.Screen name="Wave" component={Wave} />
      <Stacks.Screen name="Rise" component={Rise} />
    </Stacks.Navigator>
  );
};
