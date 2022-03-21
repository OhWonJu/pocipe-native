import React, { useContext } from "react";
import { View, FlatList } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

import CommonHeader from "../../components/CommonHeader";
import Container from "../../components/Container";
import RecipeCard from "../../components/Content/RecipeCard";

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
  font-size: 14px;
  color: ${props => props.theme.blackColor};
  padding-right: 3px;
`;
const ButtonsBox = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;
const FilterBtn = styled.TouchableWithoutFeedback``;
const EditText = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.blackColor};
`;

export default ({ navigation, title = "", data }) => {
  const themeContext = useContext(ThemeContext);

  const RECIPECARD = ({ item }) => (
    <RecipeCard item={item} navigation={navigation} isProfile={true} />
  );

  const RECIPELESS = () => <View></View>;

  return (
    <>
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
            <FilterBtn>
              <View style={{ flexDirection: "row", paddingRight: 5 }}>
                <EditText>편집순</EditText>
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
            keyExtractor={recipe => recipe.id}
            renderItem={RECIPECARD}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            numColumns={2}
          />
        ) : (
          <RECIPELESS />
        )}
      </Container>
    </>
  );
};
