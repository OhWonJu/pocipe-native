import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components/native";

import AuthHeader from "../components/Auth/AuthHeader";
import Button from "../components/Button";
import Container from "../components/Container";

// const Container = styled.View`

const CreateAccountLayout = styled.KeyboardAvoidingView`
  flex: 1;
`;

const WelcomeView = styled.View`
  width: 100%;
  height: 30%;
  background-color: rgba(255, 0, 0, 0.5);
  padding: 10px;
`;

const InputView = styled.View`
  flex: 1;
  width: 100%;
`;

const RowBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const NoticContext = styled.Text`
  font-size: 15px;
  font-weight: 700;
  margin-top: 15px;
  margin-bottom: 3px;
  color: ${props => props.theme.darkGreyColor};
`;
const NoticSubContext = styled.Text`
  font-size: 12px;
  color: ${props => props.theme.darkGreyColor};
`;

const TextInput = styled.TextInput`
  background-color: ${props => props.theme.greyColor};
  height: 50px;
  width: ${props => (props.width ? props.width : "100%")};
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 2px;
`;

export default CreateAccount = ({ navigation }) => {
  // 버튼 활성화 관련
  const [condition, setCondition] = useState({
    userName: false,
    email: false,
    password: false,
  });
  const userNameCompleted = text => {
    if (text.length > 3) {
      setCondition(prevState => {
        return { ...prevState, userName: true };
      });
    } else {
      setCondition(prevState => {
        return { ...prevState, userName: false };
      });
    }
  };
  const emailCompleted = text => {
    if (text.length > 6) {
      setCondition(prevState => {
        return { ...prevState, email: true };
      });
    } else {
      setCondition(prevState => {
        return { ...prevState, email: false };
      });
    }
  };
  const passwordCompleted = text => {
    if (text.length > 6 && text.length < 17) {
      setCondition(prevState => {
        return { ...prevState, password: true };
      });
    } else {
      setCondition(prevState => {
        return { ...prevState, password: false };
      });
    }
  };

  // ref
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordCheckRef = useRef();
  const _onNext = next => {
    next?.current?.focus();
  };

  // Form Hook
  const { register, handleSubmit, setValue, getValues } = useForm();
  const onValid = data => {
    console.log(data);
  };
  useEffect(() => {
    register("userName");
    register("email");
    register("password");
    register("passwordCheck");
  }, [register]);

  return (
    <>
      <AuthHeader title={"회원가입"} leftOnPress={navigation.goBack} />
      <Container>
        <CreateAccountLayout behavior="padding">
          <WelcomeView></WelcomeView>
          <InputView>
            <NoticContext>아이디</NoticContext>
            <RowBox>
              <TextInput
                placeholder={"아이디"}
                returnKeyType={"next"}
                autoCapitalize={"none"}
                onSubmitEditing={() => _onNext(emailRef)}
                onChangeText={text => {
                  userNameCompleted(text), setValue("userName", text);
                }}
                width={"66%"}
              />
              <Button
                text={"중복확인"}
                width={"31%"}
                disable={!condition.userName}
              />
            </RowBox>
            <NoticSubContext>
              4-12자/한글, 영문 소문자(숫자 조합 가능)
            </NoticSubContext>
            <NoticContext>이메일</NoticContext>
            <RowBox>
              <TextInput
                ref={emailRef}
                placeholder={"이메일"}
                keyboardType={"email-address"}
                returnKeyType={"next"}
                onSubmitEditing={() => _onNext(passwordRef)}
                onChangeText={text => {
                  emailCompleted(text), setValue("email", text);
                }}
                width={"66%"}
              />
              <Button
                text={"인증코드 받기"}
                width={"31%"}
                disable={!condition.email}
              />
            </RowBox>
            <NoticContext>비밀번호</NoticContext>
            <TextInput
              ref={passwordRef}
              placeholder={"비밀번호"}
              returnKeyType={"next"}
              secureTextEntry={true}
              onSubmitEditing={() => _onNext(passwordCheckRef)}
              onChangeText={text => {
                passwordCompleted(text), setValue("paasword", text);
              }}
              style={{ marginBottom: 7 }}
            />
            <TextInput
              ref={passwordCheckRef}
              placeholder={"비밀번호 확인"}
              secureTextEntry={true}
              returnKeyType={"done"}
              onSubmitEditing={handleSubmit(onValid)}
              onChangeText={text => setValue("passwordCheck", text)}
            />
            <NoticSubContext>
              6-16자/영문 대문자, 소문자, 숫자, 특수문자 중 2가지 이상 조합
            </NoticSubContext>
          </InputView>
        </CreateAccountLayout>
      </Container>
    </>
  );
};
