import React, { useRef, useState } from "react";
import styled from "styled-components/native";

import AuthHeader from "../components/AuthHeader";
import AuthInput from "../components/AuthInput";
import AuthPasswordInput from "../components/AuthPasswordInput";
import Button from "../components/Button";

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.bgColor};
`;

const CreateAccountLayout = styled.View`
  flex: 1;
  margin: 0px 20px 0px 20px;
  /* background-color: rgba(100, 255, 0, 0.3); */
`;

const WelcomeView = styled.View`
  width: 100%;
  height: 250px;
  background-color: rgba(255, 0, 0, 0.5);
  padding: 10px;
`;

const InputView = styled.View`
  flex: 1;
  width: 100%;
  padding: 0px 0px 0px 0px;
  /* background-color: blue; */
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
  const [buttonContext, setButtonContexct] = useState("다음 단계");
  const [condition, setCondition] = useState({
    userName: false,
    email: false,
    password: false,
  });

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

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordCheckRef = useRef();
  const _onNext = next => {
    next?.current?.focus();
  };

  const _onDone = () => {
    alert("done");
  };

  return (
    <Container>
      <AuthHeader title={"회원가입"} leftOnPress={navigation.goBack} />
      <CreateAccountLayout>
        <WelcomeView></WelcomeView>
        <InputView>
          <NoticContext>아이디</NoticContext>
          <RowBox>
            <TextInput
              placeholder={"아이디"}
              returnKeyType={"next"}
              returnKeyType={"next"}
              onSubmitEditing={() => _onNext(emailRef)}
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
            style={{ marginBottom: 7 }}
          />
          <TextInput
            ref={passwordCheckRef}
            placeholder={"비밀번호 확인"}
            secureTextEntry={true}
            returnKeyType={"done"}
            onSubmitEditing={_onDone}
          />
          <NoticSubContext>
            6-16자/영문 대문자, 소문자, 숫자, 특수문자 중 2가지 이상 조합
          </NoticSubContext>
        </InputView>
      </CreateAccountLayout>
    </Container>
  );
};
