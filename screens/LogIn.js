import React, { useContext, useEffect, useState } from "react";
import { StatusBar, TouchableOpacity } from "react-native";
import styled, { ThemeContext } from "styled-components";
import {
  MaterialIcons,
  Ionicons,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";

import AuthHeader from "../components/AuthHeader";
import AuthButton from "../components/AuthButton";
import AuthInput from "../components/AuthInput";
import AuthPasswordInput from "../components/AuthPasswordInput";

const statusbarHeight = StatusBar.currentHeight;

// %로 크기를 줬을 때 키보드가 올라오면 키보드가 올라온 만큼의 뷰를 뺴고 %를 다시 계산하는 듯.
// px단위는 걍 전체 뷰에 px단위로 크기를 주니까 키보드가 올라와도 안밀려올라온다..?
const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.bgColor};
  /* padding-top: ${statusbarHeight + 50}px; */
`;
const InputView = styled.View`
  /* border-style: solid;
  border-top-color: ${props => props.theme.greyColor};
  border-top-width: 1.5px; */
  margin: 0px 20px 0px 20px;
  padding: 35px 0px 10px 0px;
  /* height: 28%; */
  height: 235px;
  align-items: center;
  /* background-color: blue; */
`;
const UtilView = styled.View`
  margin: 5px 20px 0px 20px;
  height: 3%;
  height: 35px;
  flex-direction: row;
  align-items: center;
  /* background-color: green; */
`;
const LeftBox = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
`;
const RightBox = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;
const UtilText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  top: 1%;
  color: ${props => props.theme.blackColor};
`;
const EasySignInView = styled.View`
  border-style: solid;
  border-top-color: ${props => props.theme.greyColor};
  border-top-width: 1.5px;
  margin: 10px 20px 40px 20px;

  /* height: 10%; */
  align-items: center;
  /* background-color: orange; */
`;
const EasySingBoxs = styled.View`
  flex-direction: row;
  padding-bottom: 10px;
`;
const EasySignInBox = styled.TouchableOpacity`
  margin: 0px 10px;
  border-radius: 25px;
  height: 50px;
  width: 50px;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.bgColor};
`;
const EasySignText = styled.Text`
  padding: 15px 0px 25px 0px;
  font-size: 15px;
  font-weight: 700;
  color: ${props => props.theme.blackColor};
`;

const NoticView = styled.View`
  margin: 10px 20px;
  padding-top: 40px;
`;
const NoticText = styled.Text`
  font-size: 13px;
  color: ${props => props.theme.darkGreyColor};
`;

const OpacityBox = styled.View`
  width: 100%;
  align-items: center;
  opacity: ${props => (props.disable ? "0.5" : "1")};
`;

const Text = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: #FBFBFB;
`;

export default LogIn = ({ navigation }) => {
  const themeContext = useContext(ThemeContext);
  const [signButtonOPC, setSignButtonOPC] = useState({
    email: false,
    password: false,
  });
  const [turnOff, setTurnOff] = useState(true);

  const _emailCompleted = event => {
    if (event.length > 6) {
      setSignButtonOPC(prevState => {
        return { ...prevState, email: true };
      });
    } else {
      setSignButtonOPC(prevState => {
        return { ...prevState, email: false };
      });
    }
  };

  const _passwordCompleted = event => {
    if (event.length > 7 && event.length < 17) {
      setSignButtonOPC(prevState => {
        return {
          ...prevState,
          password: true,
        };
      });
    } else {
      setSignButtonOPC(prevState => {
        return {
          ...prevState,
          password: false,
        };
      });
    }
  };

  useEffect(() => {
    if (signButtonOPC.email === true && signButtonOPC.password === true) {
      setTurnOff(false);
    } else {
      setTurnOff(true);
    }
  }, [signButtonOPC]);

  const goToCreateAccount = () => {
    navigation.navigate("CreateAccount");
  };

  return (
    <Container>
      <AuthHeader title={"로그인"} leftOnPress={navigation.goBack} />
      <InputView>
        <AuthInput
          placeholder={"이메일"}
          keyboardType={"email-address"}
          onChange={_emailCompleted}
        />
        <AuthPasswordInput
          placeholder={"비밀번호"}
          onChange={_passwordCompleted}
        />
        <OpacityBox disable={turnOff}>
          <AuthButton text={"로그인"} />
        </OpacityBox>
      </InputView>
      <UtilView>
        <LeftBox>
          <TouchableOpacity
            onPress={goToCreateAccount}
            style={{ flexDirection: "row" }}
          >
            <UtilText>회원가입</UtilText>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={18}
              color={themeContext.blackColor}
            />
          </TouchableOpacity>
        </LeftBox>
        <RightBox>
          <TouchableOpacity>
            <UtilText>아이디 찾기</UtilText>
          </TouchableOpacity>
          <Ionicons
            name="remove-outline"
            size={18}
            color={themeContext.blackColor}
            style={{ transform: [{ rotate: "90deg" }] }}
          />
          <TouchableOpacity>
            <UtilText>비밀번호 찾기</UtilText>
          </TouchableOpacity>
        </RightBox>
      </UtilView>
      <EasySignInView>
        <EasySignText>간편 로그인 / 간편 가입</EasySignText>
        <EasySingBoxs>
          <EasySignInBox bgColor={"#F7D500"}>
            <Ionicons name="chatbubble-sharp" size={24} color="#573D1A" />
          </EasySignInBox>
          <EasySignInBox bgColor={"#4064AC"}>
            <FontAwesome name="facebook" size={26} color="#FBFBFB" />
          </EasySignInBox>
          <EasySignInBox bgColor={"#3897f0"}>
            <AntDesign name="twitter" size={24} color="#FBFBFB" />
          </EasySignInBox>
          <EasySignInBox bgColor={"#03C157"}>
            <Text>N</Text>
          </EasySignInBox>
        </EasySingBoxs>
      </EasySignInView>
      <NoticView>
        <NoticText>
          로그인 완료시 포시피 앱에 '자동 로그인'됩니다. 본인 기기가 아니거나
          여러 사람이 사용중인 기기인 경우 [내정보]에서 '로그아웃'을 해주세요.
        </NoticText>
      </NoticView>
    </Container>
  );
};
