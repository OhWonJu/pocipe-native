import { useQuery } from "@apollo/client";
import React, { useCallback, useContext } from "react";
import { Animated, RefreshControl, View } from "react-native";
import { ThemeContext } from "styled-components/native";

import { RECIPE_LIST_QUREY } from "../../screens/RecipeListScreens/RecipeListModel";
import constants from "../../constants";
import Loader from "../Loader";
import RecipeCard from "../Content/RecipeCard";

export default CollapsibleRecipeList = ({
  navigation,
  data,
  loading,
  headerHeight,
  scrollY,
  onEndReachedThreshold,
  onEndReached,
  refreshing,
  onRefresh,
  containerStyle,
  contentContainerStyle,
  isProfile = true,
}) => {
  const keyExtractor = useCallback((_, index) => index.toString(), []);

  if (loading) {
    return <Loader />;
  }

  const RECIPECARD = ({ item }) => (
    <RecipeCard item={item} navigation={navigation} isProfile={isProfile} />
  );

  const RECIPELESS = () => null;

  return (
    <>
      {data && data.length > 0 ? (
        <View style={containerStyle} pointerEvents="box-none">
          <Animated.FlatList
            data={data}
            renderItem={RECIPECARD}
            keyExtractor={keyExtractor}
            contentContainerStyle={{
              paddingTop: headerHeight,
              minHeight: constants.window.height + headerHeight,
              ...contentContainerStyle,
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
            scrollEventThrottle={20}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
            onEndReachedThreshold={onEndReachedThreshold}
            onEndReached={onEndReached}
            refreshControl={
              <RefreshControl
                // style={{ position: "absolute", zIndex: 999 }}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            removeClippedSubviews={true}
            initialNumToRender={10}
            legacyImplementation={true}
            bounces={false}
          />
        </View>
      ) : (
        <RECIPELESS />
      )}
    </>
  );
};
