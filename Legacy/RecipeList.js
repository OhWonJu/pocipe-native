import React, { useState, useContext } from "react";
import { View, FlatList } from "react-native";
import { useQuery } from "@apollo/client";
import styled, { ThemeContext } from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

import { RECIPE_LIST_QUREY } from "../../screens/RecipeListScreens/RecipeListModel";
import Loader from "../Loader";
import RecipeCard from "../Content/RecipeCard";
import SortModal from "../Modals/SortModal";
import constants from "../../constants";

const UtilView = styled.View`
  flex-direction: row;
  height: 50px;
  align-items: center;
`;
const CountBox = styled.View`
  flex: 1;
  flex-direction: row;
`;
const CountText = styled.Text`
  font-weight: bold;
  font-size: 13px;
  color: ${(props) => props.theme.blackColor};
  padding-right: 3px;
`;
const ButtonsBox = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;
const FilterBtn = styled.TouchableOpacity`
  /* background-color: red; */
  padding: 1px 1px 1px 1px;
`;
const EditText = styled.Text`
  font-size: 13px;
  color: ${(props) => props.theme.blackColor};
`;

export default ({ navigation, listId, isProfile = false }) => {
  const themeContext = useContext(ThemeContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [sortModeIndex, setSortModeIndex] = useState(0); // recent || createFirst || editFirst || popularity ||

  const sortModeText = ["최근", "작성순", "편집순", "인기순"];

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
      {
        <SortModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          sortModeIndex={sortModeIndex}
          setSortModeIndex={setSortModeIndex}
          sortModeText={sortModeText}
        />
      }
      <UtilView>
        <CountBox>
          {!isProfile && (
            <>
              <CountText>전체</CountText>
              <CountText style={{ color: themeContext.yellowColor }}>
                {data.length}
              </CountText>
            </>
          )}
        </CountBox>
        <ButtonsBox>
          <FilterBtn onPress={() => setModalVisible(true)}>
            <View style={{ flexDirection: "row", paddingRight: 5 }}>
              <EditText>{sortModeText[sortModeIndex]}</EditText>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={16}
                color={themeContext.blackColor}
                style={{ transform: [{ rotate: "90deg" }], left: -3 }}
              />
            </View>
          </FilterBtn>
          <FilterBtn>
            <EditText>편집</EditText>
          </FilterBtn>
        </ButtonsBox>
      </UtilView>
      {data.length > 0 ? (
        <View
          style={{ width: constants.width, left: -20 }}
        >
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
