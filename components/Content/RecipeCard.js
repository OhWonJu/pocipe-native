import React, { useContext } from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import styled, { ThemeContext } from "styled-components/native";

const CardContainer = styled.View`
  height: 230px;
  width: 180px;
  margin: 0px 10px 0px 10px;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.yellowColor + 66};
  border-radius: 20px;
`;

export default ({ item: recipe }) => {
  return (
    <TouchableWithoutFeedback>
      <CardContainer>
        <Text>{recipe.title}</Text>
        <Text>{recipe.chef.userName}</Text>
      </CardContainer>
    </TouchableWithoutFeedback>
  );
};
