import React from "react";
import styled from "styled-components/native";

import constants from "../../constants";

const Container = styled.View`
  width: ${props => (props.width ? props.width : "100%")};
  margin-bottom: 15px;
`;
const TextInput = styled.TextInput`
  background-color: ${props => props.theme.lightGreyColor};
  height: 50px;
  /* width: ${constants.width / 1.2}px; */
  width: 100%;
  padding: 10px;
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
  width = null,
  ref = null,
}) => (
  <Container width={width}>
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChange}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      returnKeyType={returnKeyType}
      onSubmitEditing={onSubmitEditing}
      autoCorrect={autoCorrect}
      ref={ref}
    />
  </Container>
);

export default AuthInput;
