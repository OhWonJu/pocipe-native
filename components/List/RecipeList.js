import React, { useState, useContext } from "react";
import { View, FlatList } from "react-native";
import { useQuery } from "@apollo/client";
import styled, { ThemeContext } from "styled-components/native";

import { RECIPE_LIST_QUREY } from "../../screens/RecipeListScreens/RecipeListModel";
import Loader from "../Loader";
import RecipeCard from "../Content/RecipeCard";
import constants from "../../constants";

export default ({ navigation, listId }) => {
  const themeContext = useContext(ThemeContext);

  const { data: origin, loading } = useQuery(RECIPE_LIST_QUREY, {
    listId: listId,
    skip: !listId,
  });
  const data = origin?.seeRecipes;

  if (loading) {
    return <Loader />;
  }

  const RECIPECARD = ({ item }) => (
    <RecipeCard item={item} navigation={navigation} isProfile={true} />
  );

  const RECIPELESS = () => <View></View>;

  return (
    <>
      {data.length > 0 ? (
        <View style={{ width: constants.width, left: -20 }}>
          <FlatList
            data={data}
            keyExtractor={(recipe) => recipe.id}
            renderItem={RECIPECARD}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          />
        </View>
      ) : (
        <RECIPELESS />
      )}
    </>
  );
};
