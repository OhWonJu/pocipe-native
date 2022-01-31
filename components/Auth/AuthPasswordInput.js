import React, { useState } from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";

import constants from "../../constants";

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
const VisibleControler = styled.TouchableOpacity`
  position: absolute;
  left: 88%;
  margin: 10px;
  height: 30px;
  width: 30px;
  justify-content: center;
  align-items: center;
`;

// TextInput Doc참고해서 보내는 props 설정...
const AuthPasswordInput = ({
  placeholder,
  value,
  keyboardType = "default",
  autoCapitalize = "none",
  onChange,
  returnKeyType = "done",
  onSubmitEditing = () => null,
  autoCorrect = true,
  ref = null,
}) => {
  const [passwordUnvisible, setPasswordUnvisible] = useState(true);

  const _handlePasswordVisible = () => {
    setPasswordUnvisible(!passwordUnvisible);
  };

  return (
    <Container>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={text => onChange(text)}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        returnKeyType={returnKeyType}
        onSubmitEditing={()=>onSubmitEditing}
        autoCorrect={autoCorrect}
        secureTextEntry={passwordUnvisible}
        ref={ref}
      />
      <VisibleControler onPress={_handlePasswordVisible}>
        {passwordUnvisible === true ? (
          <AntDesign name="eyeo" size={20} color="#262626" />
        ) : (
          <AntDesign name="eye" size={20} color="#262626" />
        )}
      </VisibleControler>
    </Container>
  );
};

export default AuthPasswordInput;
