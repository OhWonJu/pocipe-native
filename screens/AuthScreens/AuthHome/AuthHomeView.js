import React from "react";
import styled from "styled-components/native";

import AuthButton from "../../../components/Auth/AuthButton";

const Container = styled.View`
  flex: 1;
  /* align-items: center; */
  justify-content: center;
  background-color: ${props => props.theme.bgColor};
`;
const Logo = styled.Image`
  left: 15%;
  max-width: 70%;
  height: 200px;
`;
const AuthBox = styled.View`
  margin: 10px 20px 0px 20px;
  padding: 30px 0px 10px 0px;
  align-items: center;
`;

// props의 navigation.naviagte(nav name)
export default AuthHomeView = ({ goToSignIn, goToSignUp }) => {
  return (
    <Container>
      <Logo
        source={require("../../../assets/loadingPage/Logo-yellow.png")}
        resizeMode="contain"
      />
      <AuthBox>
        <AuthButton
          text={"로그인"}
          bgColor={"#FBFBFB"}
          txColor={"#F6B93B"}
          onPress={goToSignIn}
        />
        <AuthButton text={"회원 가입"} onPress={goToSignUp} />
      </AuthBox>
    </Container>
  );
};
