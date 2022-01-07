import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { get, useForm } from "react-hook-form";
import styled from "styled-components/native";

import AuthHeader from "../components/Auth/AuthHeader";
import Button from "../components/Button";
import Container from "../components/Container";

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

const SEARCH_USER = gql`
  query seeProfile($userName: String!) {
    seeProfile(userName: $userName) {
      userName
    }
  }
`;

export default CreateAccount = ({ navigation }) => {
  // 가입버튼 제어를 위한 state
  const [condition, setCondition] = useState({
    userNameLen: false, // 최소 길이 및 조건 만족 여부
    userName: false, // 중복 체크 여부
    emailLen: false,
    email: false, // 이메일 인증 여부
    passwordLen: false, // 최소 길이 및 조건 만족 여부
    password: false, // 비밀번호 확인 여부
  });

  // Form Hook
  const { register, handleSubmit, setValue, getValues } = useForm();
  const onValid = data => {
    console.log(data);
    console.log(condition);
  };
  useEffect(() => {
    register("userName", {
      required: true,
    });
    register("email", {
      required: true,
    });
    register("password", {
      required: true,
    });
    register("passwordCheck", {
      required: true,
    });
  }, [register]);

  // Back-end APIs
  // 유저명 중복확인 query 성공시
  const onCompletedSearch = ({ seeProfile }) => {
    if (seeProfile === null) {
      setCondition(prevState => {
        // 호출 결과를 즉시 받기 위헤 setState 안에서 호출
        alert("사용 가능한 아이디입니다.");
        return { ...prevState, userName: true };
      });
      // hooks에서 setValue한 직후에는 이전 값을 나타냄..
      // rerender 하기 전에 뿌리고 rendering 되니까 그런듯
    } else {
      setCondition(prevState => {
        alert("이미 사용중인 아이디입니다.");
        return { ...prevState, userName: false };
      });
    }
  };
  const [searchExistUserName, { loading }] = useLazyQuery(SEARCH_USER, {
    onCompleted: onCompletedSearch,
  });

  // 버튼 활성화 관련
  const userNameCompleted = text => {
    if (text.length > 3) {
      setCondition(prevState => {
        return { ...prevState, userNameLen: true };
      });
    } else {
      setCondition(prevState => {
        return { ...prevState, userNameLen: false };
      });
    }
  };
  const emailCompleted = text => {
    if (text.length > 6) {
      setCondition(prevState => {
        return { ...prevState, emailLen: true };
      });
    } else {
      setCondition(prevState => {
        return { ...prevState, emailLen: false };
      });
    }
  };
  const passwordCompleted = text => {
    if (text.length > 6 && text.length < 17) {
      setCondition(prevState => {
        return { ...prevState, passwordLen: true };
      });
    } else {
      setCondition(prevState => {
        return { ...prevState, passwordLen: false };
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
                disable={!condition.userNameLen}
                onPress={() =>
                  searchExistUserName({
                    variables: { userName: getValues("userName") },
                  })
                }
              />
            </RowBox>
            <NoticSubContext>
              4-12자/한글, 영문 소문자(숫자 조합 가능) {`\n`}
              Pocipe 내에서 표시될 이름입니다.
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
                disable={!condition.emailLen}
              />
            </RowBox>
            <NoticSubContext>로그인 시에 사용됩니다</NoticSubContext>

            <NoticContext>비밀번호</NoticContext>
            <TextInput
              ref={passwordRef}
              placeholder={"비밀번호"}
              returnKeyType={"next"}
              secureTextEntry={true}
              onSubmitEditing={() => _onNext(passwordCheckRef)}
              onChangeText={text => {
                passwordCompleted(text), setValue("password", text);
              }}
              style={{ marginBottom: 7 }}
            />
            <TextInput
              ref={passwordCheckRef}
              placeholder={"비밀번호 확인"}
              secureTextEntry={true}
              returnKeyType={"done"}
              onChangeText={text => setValue("passwordCheck", text)}
            />
            <NoticSubContext>
              6-16자/영문 대문자, 소문자, 숫자, 특수문자 중 2가지 이상 조합
            </NoticSubContext>
          </InputView>
        </CreateAccountLayout>
      </Container>
      <Button
        text={"Pocipe 시작하기"}
        width={"100%"}
        radius={"0px"}
        txSize={25}
        //disable={!condition.email && !condition.userName && !condition.password}
        disable={!condition.userName}
        onPress={handleSubmit(onValid)}
      />
    </>
  );
};
