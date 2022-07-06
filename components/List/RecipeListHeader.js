import React, { useState, useContext } from "react";
import { View } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

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

export default ({
  recipeCount = 0,
  isProfile = false,
  setModalVisible,
  sortModeIndex,
}) => {
  const themeContext = useContext(ThemeContext);

  const sortModeText = ["최근", "작성순", "편집순", "인기순"];

  return (
    <>
      <UtilView pointerEvents="box-none">
        <CountBox>
          {!isProfile && (
            <>
              <CountText>전체</CountText>
              <CountText style={{ color: themeContext.yellowColor }}>
                {recipeCount}
              </CountText>
            </>
          )}
        </CountBox>
        <ButtonsBox pointerEvents="box-none">
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
    </>
  );
};
