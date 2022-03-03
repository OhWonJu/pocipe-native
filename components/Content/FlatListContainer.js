import React, { useContext } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 20px 20px 0px 20px;
`;
const TitleTest = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${props => props.theme.blackColor};
`;
const ListContainer = styled.View`
  height: 250px;
  justify-content: center;
  padding: 10px 0px 10px 0px;
`;

export default ({ contentListTitle, loading, children }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <View pointerEvents="box-none">
      <TitleContainer>
        <TouchableOpacity
          onPress={() => null}
          style={{
            flexDirection: "row",
            alignItems: "center",
            // paddingHorizontal: 20,
            // paddingTop: 20,
          }}
        >
          <TitleTest>{contentListTitle}</TitleTest>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={30}
            color={themeContext.blackColor}
          />
        </TouchableOpacity>
      </TitleContainer>
      <ListContainer>
        {loading ? (
          <ActivityIndicator color={themeContext.yellowColor} />
        ) : (
          children
        )}
      </ListContainer>
    </View>
  );
};
