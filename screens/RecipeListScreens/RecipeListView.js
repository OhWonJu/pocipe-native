import React, { useContext } from "react";
import { View, FlatList } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

import CommonHeader from "../../components/CommonHeader";
import Container from "../../components/Container";
import RecipeCard from "../../components/Content/RecipeCard";
import SortModal from "../../components/Modals/SortModal";
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
  font-weight: 700;
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

export default ({
  navigation,
  modalVisible,
  setModalVisible,
  sortModeIndex,
  setSortModeIndex,
  sortModeText,
  title = "",
  data,
}) => {
  const themeContext = useContext(ThemeContext);

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
      <CommonHeader navigation={navigation} type={"Setting"} title={title} />
      <Container>
        <UtilView>
          <CountBox>
            <CountText>전체</CountText>
            <CountText style={{ color: themeContext.yellowColor }}>
              {data.length}
            </CountText>
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
        ) : (
          <RECIPELESS />
        )}
      </Container>
    </>
  );
};
