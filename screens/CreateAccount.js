import React from "react";
import styled from "styled-components/native";
import AuthHeader from "../components/AuthHeader";

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.bgColor};
`;

export default CreateAccount = ({ navigation }) => {
  return (
    <Container>
      <AuthHeader title={"회원가입"} leftOnPress={navigation.goBack} />
    </Container>
  );
};
