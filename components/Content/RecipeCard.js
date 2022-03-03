import React, { useContext } from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import styled, { ThemeContext } from "styled-components/native";

const CardContainer = styled.View`
  height: 230px;
  width: 180px;
  margin: 0px 10px 0px 10px;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.yellowColor};
  border-radius: 20px;
`;

export default ({ item: recipe, navigation, route }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate("RecipeDetail", { recipeId: recipe.id })
      }
    >
      <CardContainer>
        <Text>{recipe.id}</Text>
        <Text>{recipe.title}</Text>
        <Text>{recipe.chef.userName}</Text>
      </CardContainer>
    </TouchableWithoutFeedback>
  );
};
