import React, { useContext, useState } from "react";
import { Image, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ThemeContext } from "styled-components/native";
import { Feather, Entypo } from "@expo/vector-icons";

import StackNavFactorty from "./StackNavFactorty";
import useMe from "../Hooks/useMe";

const FONT_SIZE = 10;
const FONT_WEIGHT = "normal";

const Tabs = createBottomTabNavigator();

export default () => {
  const themeContext = useContext(ThemeContext);

  const { data } = useMe();

  const [tabBarVisible, setTabBarVisible] = useState("flex"); // flex | none

  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarStyle: {
          display: tabBarVisible,
          height: 58,
          paddingBottom: 3,
          borderTopWidth: 0,
          backgroundColor: themeContext.bgColor,
          elevation: 2, // 그림자 제거 - 고도 옵션이라.....0이면 딱 달라붙어있는 너낌?
        },
        tabBarActiveTintColor: themeContext.yellowColor,
        tabBarInactiveTintColor: themeContext.blackColor + "55",
        gestureEnabled: true,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name={"TabHome"}
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
      >
        {() => (
          <StackNavFactorty
            screenName="Home"
            setTabBarVisible={setTabBarVisible}
          />
        )}
      </Tabs.Screen>
      <Tabs.Screen
        name={"TabSearch"}
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
      >
        {() => (
          <StackNavFactorty
            screenName="Search"
            setTabBarVisible={setTabBarVisible}
          />
        )}
      </Tabs.Screen>
      <Tabs.Screen
        name={"TabMarket"}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Entypo
              name="shop"
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
      >
        {() => (
          <StackNavFactorty
            screenName="Market"
            setTabBarVisible={setTabBarVisible}
          />
        )}
      </Tabs.Screen>
      <Tabs.Screen
        name={"TabMyPage"}
        options={{
          tabBarIcon: ({ focused, color }) =>
            data?.me?.profilePhoto ? (
              <View
                style={{
                  top: 1,
                  height: 28,
                  width: 28,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 14,
                  ...(focused && {
                    borderColor: themeContext.yellowColor,
                    borderWidth: 2,
                  }),
                }}
              >
                <Image
                  source={{ uri: data.me.profilePhoto }}
                  style={{
                    height: 25,
                    width: 25,
                    borderRadius: 20,
                  }}
                />
              </View>
            ) : (
              <Feather
                name="user"
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
              마이페이지
            </Text>
          ),
        }}
      >
        {() => (
          <StackNavFactorty
            screenName="MyPage"
            setTabBarVisible={setTabBarVisible}
          />
        )}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
};
