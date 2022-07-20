import React, { useCallback, useContext } from "react";
import { Animated, View } from "react-native";
import { useCollapsibleScene } from "react-native-collapsible-tab-view";
import { ThemeContext } from "styled-components";

import HomeScreenScrollView from "../../../components/Home/HomeScreenScrollView";
import ToDoCard from "../../../components/ToDo/ToDoCard";

export default RecipeToDoScreen = ({
  navigation,
  route,
  toDos,
  toDosCount,
}) => {
  const themeContext = useContext(ThemeContext);

  const scrollPropsAndRef = useCollapsibleScene(route.name);
  const keyExtractor = useCallback((_, index) => index.toString(), []);

  const TODOCARD = ({ item }) => {
    return <ToDoCard toDosCount={toDosCount} {...item} />;
  };

  // 투두리스트 edit 뷰를 따로 둬야할듯
  return (
    <>
      <Animated.FlatList
        {...scrollPropsAndRef}
        data={toDos}
        keyExtractor={keyExtractor}
        renderItem={TODOCARD}
        scrollEventThrottle={16}
        initialNumToRender={5}
        legacyImplementation={true}
        showsVerticalScrollIndicator={false}
        bounces={false}
      />
      {/* <HomeScreenScrollView
        navigation={navigation}
        route={route}
        paddingSet={false}
        ContainerStyle={{
          backgroundColor: "",
          marginTop: 10,
        }}
      >
        {toDos.map((data, index) => (
          <ToDoCard key={index} toDosCount={toDosCount} {...data} />
        ))}
      </HomeScreenScrollView> */}
    </>
  );
};
