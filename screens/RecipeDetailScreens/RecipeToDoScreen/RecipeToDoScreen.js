import React, { useContext } from "react";
import { View } from "react-native";
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
  // 투두리스트 edit 뷰를 따로 둬야할듯
  return (
    <HomeScreenScrollView
      navigation={navigation}
      route={route}
      paddingSet={false}
      ContainerStyle={{
        backgroundColor: "",
        marginTop: 10,
      }}
    >
      {toDos.map((data, index) => (
        <ToDoCard
          key={index}
          focused={index == 2 ? true : false}
          toDosCount={toDosCount}
          {...data}
        />
      ))}
    </HomeScreenScrollView>
  );
};
