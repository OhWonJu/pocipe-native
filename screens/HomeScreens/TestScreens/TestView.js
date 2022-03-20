import React, { useContext } from "react";
import { FlatList } from "react-native";
import styled, { ThemeContext } from "styled-components/native";

import HomeScreenScrollView from "../../../components/Home/HomeScreenScrollView";
import FlatListContainer from "../../../components/Content/FlatListContainer";
import RecipeCard from "../../../components/Content/RecipeCard";

export default ({ navigation, route, data, loading }) => {
  const themeContext = useContext(ThemeContext);

  const RECIPECARD = ({ item }) => (
    <RecipeCard item={item} navigation={navigation} route={route} />
  );

  return (
    <HomeScreenScrollView
      navigation={navigation}
      route={route}
      paddingSet={false}
    >
      <FlatListContainer
        contentListTitle={"마이레시피"}
        loading={loading}
        navigation={navigation}
      >
        <FlatList
          data={data?.seeMyRecipe}
          keyExtractor={recipe => recipe.id}
          renderItem={RECIPECARD}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </FlatListContainer>

      <FlatListContainer
        contentListTitle={"마이레시피"}
        loading={loading}
        navigation={navigation}
      >
        <FlatList
          data={data?.seeMyRecipe}
          keyExtractor={recipe => recipe.id}
          renderItem={RECIPECARD}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </FlatListContainer>

      <FlatListContainer
        contentListTitle={"마이레시피"}
        loading={loading}
        navigation={navigation}
      >
        <FlatList
          data={data?.seeMyRecipe}
          keyExtractor={recipe => recipe.id}
          renderItem={RECIPECARD}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </FlatListContainer>
      <FlatListContainer
        contentListTitle={"마이레시피"}
        loading={loading}
        navigation={navigation}
      >
        <FlatList
          data={data?.seeMyRecipe}
          keyExtractor={recipe => recipe.id}
          renderItem={RECIPECARD}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </FlatListContainer>
      <FlatListContainer
        contentListTitle={"마이레시피"}
        loading={loading}
        navigation={navigation}
      >
        <FlatList
          data={data?.seeMyRecipe}
          keyExtractor={recipe => recipe.id}
          renderItem={RECIPECARD}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </FlatListContainer>
      <FlatListContainer
        contentListTitle={"마이레시피"}
        loading={loading}
        navigation={navigation}
      >
        <FlatList
          data={data?.seeMyRecipe}
          keyExtractor={recipe => recipe.id}
          renderItem={RECIPECARD}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </FlatListContainer>
    </HomeScreenScrollView>
  );
};
