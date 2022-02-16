import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

import AuthInput from "../components/Auth/AuthInput";
import Container from "../components/Container";
import constants from "../constants";

const SearchInputWrapper = styled.View`
  padding: ${constants.statusBarHeight + 20}px 0px 20px 0px;
  flex-direction: row;
`;

export default Search = ({ navigation }) => {
  return (
    <>
      <Container>
        <SearchInputWrapper>
          <AuthInput placeholder={"검색어를 입력해주세요."} />
        </SearchInputWrapper>
        <View>
          <Text>Search</Text>
        </View>
      </Container>
    </>
  );
};
