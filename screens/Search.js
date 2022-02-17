import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import AuthInput from "../components/Auth/AuthInput";
import Container from "../components/Container";
import constants from "../constants";

const SearchInputWrapper = styled.View`
  padding: ${constants.statusBarHeight + 10}px 0px 20px 0px;
  flex-direction: row;
`;

export default Search = ({ navigation, route }) => {
  return (
    <>
      <Container>
        <SearchInputWrapper>
          <AuthInput placeholder={"검색어를 입력해주세요."} height={45} />
        </SearchInputWrapper>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("RecipeDetail", { from: route.name })
            }
          >
            <Text>Search</Text>
          </TouchableOpacity>
        </View>
      </Container>
    </>
  );
};
