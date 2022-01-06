import React, { useContext, useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import {
  MaterialIcons,
  Ionicons,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";

import Container from "../components/Container";
import AuthHeader from "../components/Auth/AuthHeader";
import AuthButton from "../components/Auth/AuthButton";
import { isSignInVar } from "../apollo";

//const statusbarHeight = StatusBar.currentHeight;

// %로 크기를 줬을 때 키보드가 올라오면 키보드가 올라온 만큼의 뷰를 뺴고 %를 다시 계산하는 듯.
// px단위는 걍 전체 뷰에 px단위로 크기를 주니까 키보드가 올라와도 안밀려올라온다.
// const Container = styled.View`
//   flex: 1;
//   background-color: ${props => props.theme.bgColor};
//   /* padding-top: ${statusbarHeight + 50}px; */
// `;
const InputView = styled.View`
  margin-top: 5px;
  padding: 35px 0px 10px 0px;
  /* height: 28%; */
  height: 235px;
  align-items: center;
`;
const UtilView = styled.View`
  /* height: 3%; */
  height: 35px;
  flex-direction: row;
  align-items: center;
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
  margin: 8px 0px 40px 0px;
  align-items: center;
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
  margin-top: 4px;
`;

const Text = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: #fbfbfb;
`;

const TextInput = styled.TextInput`
  background-color: ${props => props.theme.greyColor};
  height: 50px;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const PasswordBox = styled.View`
  width: 100%;
  margin-bottom: 10px;
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

const SIGN_IN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      error
    }
  }
`;

export default SignIn = ({ navigation }) => {
  const themeContext = useContext(ThemeContext);

  // react hook form
  const { register, handleSubmit, setValue } = useForm();
  const onValid = data => {
    if (!loading) {
      logInMutation({
        variables: {
          ...data,
        },
      });
    }
  };
  useEffect(() => {
    register("email");
    register("password");
  }, [register]);

  // querys
  const onCompleted = data => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      isSignInVar(true);
    }
  };
  // back-endd의 typeDef+Mutation인거지 내가 임의로 재정의 불가
  const [logInMutation, { loading }] = useMutation(SIGN_IN_MUTATION, {
    onCompleted,
  });

  // Ref
  const passwordRef = useRef();
  const onEmailNext = () => {
    passwordRef?.current?.focus();
  };

  // 로그인 버튼 활성화 관련
  const [signButtonOPC, setSignButtonOPC] = useState({
    email: false,
    password: false,
  });
  const [turnOff, setTurnOff] = useState(true);
  const emailCompleted = text => {
    if (text.length > 6) {
      setSignButtonOPC(prevState => {
        return { ...prevState, email: true };
      });
    } else {
      setSignButtonOPC(prevState => {
        return { ...prevState, email: false };
      });
    }
  };
  const passwordCompleted = text => {
    // 테스트를 위해 len 조절... 원래는 7자 이상
    if (text.length > 3 && text.length < 17) {
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

  // password 입력 보안 보기 관련
  const [passwordUnvisible, setPasswordUnvisible] = useState(true);
  const _handlePasswordVisible = () => {
    setPasswordUnvisible(!passwordUnvisible);
  };

  // navigate
  const goToCreateAccount = () => {
    navigation.navigate("CreateAccount");
  };

  return (
    <>
      <AuthHeader title={"로그인"} leftOnPress={navigation.goBack} />
      <Container>
        <InputView>
          <TextInput
            placeholder={"이메일"}
            keyboardType={"email-address"}
            returnKeyType="next"
            onChangeText={text => {
              emailCompleted(text);
              setValue("email", text);
            }}
            onSubmitEditing={onEmailNext}
          />
          <PasswordBox>
            <TextInput
              ref={passwordRef}
              placeholder={"비밀번호"}
              returnKeyType={"done"}
              onChangeText={text => {
                passwordCompleted(text);
                setValue("password", text);
              }}
              secureTextEntry={passwordUnvisible}
              onSubmitEditing={handleSubmit(onValid)}
            />
            <VisibleControler onPress={_handlePasswordVisible}>
              {passwordUnvisible === true ? (
                <AntDesign name="eyeo" size={20} color="#262626" />
              ) : (
                <AntDesign name="eye" size={20} color="#262626" />
              )}
            </VisibleControler>
          </PasswordBox>
          <OpacityBox>
            <AuthButton
              text={"로그인"}
              disabled={turnOff}
              onPress={handleSubmit(onValid)}
            />
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
    </>
  );
};
