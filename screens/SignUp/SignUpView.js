import React from "react";
import styled from "styled-components/native";

import AuthHeader from "../../components/Auth/AuthHeader";
import Button from "../../components/Button";
import Container from "../../components/Container";

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

export default SignUpView = ({
  condition,
  emailRef,
  passwordRef,
  passwordCheckRef,
  onNext,
  goBack,
  setValue,
  getValues,
  userNameCompleted,
  searchExistUserName,
  emailCompleted,
  passwordCompleted,
  handleSubmit,
  onValid,
}) => {
  return (
    <>
      <AuthHeader title={"회원가입"} leftOnPress={goBack} />
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
                onSubmitEditing={() => onNext(emailRef)}
                onChangeText={text => {
                  userNameCompleted(text), setValue("userName", text);
                }}
                width={"66%"}
              />
              <Button
                text={"중복확인"}
                width={"31%"}
                disable={!condition.userNameVaild}
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
                onSubmitEditing={() => onNext(passwordRef)}
                onChangeText={text => {
                  emailCompleted(text), setValue("email", text);
                }}
                width={"66%"}
              />
              <Button
                text={"인증코드 받기"}
                width={"31%"}
                disable={!condition.emailVaild}
              />
            </RowBox>
            <NoticSubContext>로그인 시에 사용됩니다</NoticSubContext>

            <NoticContext>비밀번호</NoticContext>
            <TextInput
              ref={passwordRef}
              placeholder={"비밀번호"}
              returnKeyType={"next"}
              secureTextEntry={true}
              onSubmitEditing={() => onNext(passwordCheckRef)}
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
        disable={!condition.userNameConf}
        onPress={handleSubmit(onValid)}
      />
    </>
  );
};
