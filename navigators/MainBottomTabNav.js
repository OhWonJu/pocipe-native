import React, { useContext } from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ThemeContext } from "styled-components/native";
import { Feather } from "@expo/vector-icons";

import Home from "../screens/HomeScreens/index";
import Search from "../screens/Search";
import Market from "../screens/market";
import Profile from "../screens/Profile";
import Svg, { Circle, ClipPath, Image } from "react-native-svg";

const FONT_SIZE = 10;
const FONT_WEIGHT = "normal";

const Tabs = createBottomTabNavigator();

// 여기서 스택으로 레시피 디테일 뷰 등을 넣어놓고..
// 여기 안에서 tabNav를 불러오는 형식이 낫지 않을까??

export default () => {
  const themeContext = useContext(ThemeContext);

  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 58,
          paddingBottom: 3,
          borderTopWidth: 0,
          backgroundColor: themeContext.bgColor,
          elevation: 1, // 그림자 제거 - 고도 옵션이라.....0이면 딱 달라붙어있는 너낌?
        },
        tabBarActiveTintColor: themeContext.yellowColor,
        tabBarInactiveTintColor: themeContext.blackColor + "55",
        gestureEnabled: true,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name={"Home"}
        component={Home}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Feather name="home" size={focused ? 25 : 24} color={color} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                fontSize: FONT_SIZE,
                fontWeight: FONT_WEIGHT,
                color: color,
              }}
            >
              홈
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name={"Search"}
        component={Search}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Feather
              name="search"
              size={focused ? 25 : 24}
              color={color}
              Style={{ fontWeight: focused ? "bold" : "normal" }}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                fontSize: FONT_SIZE,
                fontWeight: FONT_WEIGHT,
                color: color,
              }}
            >
              검색
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name={"Market"}
        component={Market}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Feather
              name="shopping-cart"
              size={focused ? 25 : 24}
              color={color}
              iconStyle={{ fontWeight: focused ? "bold" : "normal" }}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                fontSize: FONT_SIZE,
                fontWeight: FONT_WEIGHT,
                color: color,
              }}
            >
              마켓
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name={"Profile"}
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Svg height="40" width="40">
              <Circle
                r={16}
                cx={20}
                cy={20}
                fill={focused ? color : "transparent"}
              />
              <ClipPath id="clip">
                <Circle r={15} cx={20} cy={20} />
              </ClipPath>
              <Image
                height={40}
                width={40}
                href={require("../assets/pocipeIcon.png")}
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#clip)"
              />
            </Svg>
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                fontSize: FONT_SIZE,
                fontWeight: FONT_WEIGHT,
                color: color,
              }}
            >
              마이페이지
            </Text>
          ),
        }}
      />
    </Tabs.Navigator>
  );
};
