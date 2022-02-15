import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ThemeContext } from "styled-components/native";

import Home from "../screens/HomeScreens/index";
import Search from "../screens/Search";
import Shop from "../screens/Shop";
import Profile from "../screens/Profile";

const Tabs = createBottomTabNavigator();

// 여기서 스택으로 레시피 디테일 뷰 등을 넣어놓고..
// 여기 안에서 tabNav를 불러오는 형식이 낫지 않을까??

export default () => {
  const themeContext = useContext(ThemeContext);

  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: themeContext.bgColor,
          elevation: 0, // 그림자 제거 - 고도 옵션이라.....0이면 딱 달라붙어있는 너낌?
        },
        gestureEnabled: true,
        headerShown: false,
      }}
    >
      <Tabs.Screen name={"홈"} component={Home} />
      <Tabs.Screen name={"검색"} component={Search} />
      <Tabs.Screen name={"마켓"} component={Shop} />
      <Tabs.Screen name={"마이페이지"} component={Profile} />
    </Tabs.Navigator>
  );
};
