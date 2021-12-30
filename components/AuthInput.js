import React from "react";
import styled from "styled-components/native";

import constants from "../constants";

const Container = styled.View`
  width: 100%;
  margin-bottom: 15px;
`;
const TextInput = styled.TextInput`
  background-color: ${props => props.theme.greyColor};
  height: 50px;
  /* width: ${constants.width / 1.2}px; */
  width: 100%;
  padding: 10px;
  /* margin: 0px 50px; */
  /* border: 1px solid ${props => props.theme.darkGreyColor}; */
  border-radius: 10px;
`;

// TextInput Doc참고해서 보내는 props 설정...
const AuthInput = ({
  placeholder,
  value,
  keyboardType = "default",
  autoCapitalize = "none",
  onChange,
  returnKeyType = "done",
  onSubmitEditing = () => null,
  autoCorrect = true,
}) => (
  <Container>
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChange}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      returnKeyType={returnKeyType}
      onSubmitEditing={onSubmitEditing}
      autoCorrect={autoCorrect}
    />
  </Container>
);

export default AuthInput;
