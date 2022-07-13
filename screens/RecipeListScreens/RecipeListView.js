import React, { useContext, useRef } from "react";
import { Animated, SafeAreaView } from "react-native";
import styled, { ThemeContext } from "styled-components/native";

import CommonHeader from "../../components/CommonHeader";
import SortModal from "../../components/Modals/SortModal";
import CollapsibleRecipeList from "../../components/Collapsible/CollapsibleRecipeList";
import RecipeListHeader from "../../components/List/RecipeListHeader";

const ListHaeder = styled(Animated.View)`
  background-color: ${(props) => props.theme.bgColor};
  padding: 10px 20px 0px 20px;
  z-index: 800;
`;

export default ({
  navigation,
  modalVisible,
  setModalVisible,
  sortModeIndex,
  setSortModeIndex,
  title = "",
  data = [],
  loading,
}) => {
  const themeContext = useContext(ThemeContext);

  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <>
      <CommonHeader navigation={navigation} type={"Setting"} title={title} />
      <SafeAreaView>
        <ListHaeder>
          <RecipeListHeader
            recipeCount={data.length}
            setModalVisible={setModalVisible}
            sortModeIndex={sortModeIndex}
          />
        </ListHaeder>
        <CollapsibleRecipeList
          navigation={navigation}
          data={data}
          loading={loading}
          headerHeight={0}
          scrollY={scrollY}
          onEndReachedThreshold={0.1}
          onEndReached={null}
          refreshing={null}
          onRefresh={null}
          contentContainerStyle={{
            paddingBottom: 300,
            backgroundColor: themeContext.bgColor,
          }}
          isProfile={false}
        />
      </SafeAreaView>
      {
        <SortModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          sortModeIndex={sortModeIndex}
          setSortModeIndex={setSortModeIndex}
        />
      }
    </>
  );
};
