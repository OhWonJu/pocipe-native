import React from "react";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

import AuthGuide from "../../../components/Auth/AuthGuide";
import AuthHeader from "../../../components/Auth/AuthHeader";
import Button from "../../../components/Button";
import Container from "../../../components/Container";
import constants from "../../../constants";

const CreateAccountLayout = styled.KeyboardAvoidingView`
  flex: 1;
`;

const WelcomeView = styled.View`
  width: ${constants.width}px;
  /* width: 100%; */
  right: 20px;
  height: 30%;
  padding: 10px;
`;

const RequiredInputView = styled(Animated.View)`
  flex: 1;
  width: 100%;
`;

const SubJoinInputView = styled(Animated.View)`
  flex: 1;
`;

const RowBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const NoticContext = styled.Text`
  font-size: 15px;
  font-weight: 700;
  margin-top: 10px;
  margin-bottom: 3px;
  color: ${props => props.theme.darkGreyColor};
`;
const NoticSubContext = styled.Text`
  font-size: 12px;
  margin-bottom: 5px;
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

const PasswordCheckInput = styled.TextInput`
  background-color: ${props => props.theme.greyColor};
  height: 50px;
  width: ${props => (props.width ? props.width : "100%")};
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 2px;
  border: ${props => (props.passwordChecked ? 0 : 1)}px;
  border-color: ${props => props.theme.redColor};
`;

export default SignUpView = ({
  condition,
  emailRef,
  passwordRef,
  passwordCheckRef,
  firstNameRef,
  phoneNumberRef,
  onNext,
  goBack,
  setValue,
  getValues,
  searchExistUserName,
  userNameVerification,
  emailCode,
  requestAccountCode,
  emailVerification,
  setCode,
  accountCodeComparsion,
  time,
  passwordVerification,
  passwordComparison,
  handleSubmit,
  onValid,
  trigger,
  openEvent,
  closeEvent,
  requiredInputAnimeStyle,
  SubjoinInputViewAnimeStyle,
}) => {
  return (
    <>
      <AuthHeader title={"회원가입"} leftOnPress={goBack} />
      <Container>
        <CreateAccountLayout behavior="padding">
          <WelcomeView>
            <AuthGuide
              guideKey={
                condition.userNameConfirm && condition.passwordConfirm ? 0 : 1
              }
              trigger={trigger}
              openEvent={openEvent}
              closeEvent={closeEvent}
            />
          </WelcomeView>
          {trigger == 1 ? (
            <RequiredInputView style={requiredInputAnimeStyle}>
              <NoticContext>아이디</NoticContext>
              <RowBox>
                <TextInput
                  placeholder={"아이디"}
                  defaultValue={getValues("userName")}
                  returnKeyType={"next"}
                  autoCapitalize={"none"}
                  onSubmitEditing={() => onNext(emailRef)}
                  onChangeText={text => {
                    userNameVerification(text), setValue("userName", text);
                  }}
                  width={"66%"}
                />
                <Button
                  text={"중복확인"}
                  width={"31%"}
                  disable={!condition.userNameVerify}
                  onPress={() => {
                    searchExistUserName({
                      variables: { userName: getValues("userName") },
                    });
                  }}
                />
              </RowBox>
              <NoticSubContext>
                4-12자/한글, 영문 소문자(숫자 조합 가능) {`\n`}
                Pocipe 내에서 표시될 이름입니다.
              </NoticSubContext>

              <NoticContext>이메일</NoticContext>
              {emailCode === "" ? (
                <>
                  <RowBox>
                    <TextInput
                      ref={emailRef}
                      defaultValue={getValues("email")}
                      placeholder={"이메일"}
                      keyboardType={"email-address"}
                      returnKeyType={"next"}
                      onSubmitEditing={() => onNext(passwordRef)}
                      onChangeText={text => {
                        emailVerification(text), setValue("email", text);
                      }}
                      editable={condition.emailConfirm ? false : true}
                      width={"66%"}
                    />
                    <Button
                      text={"인증코드 받기"}
                      width={"31%"}
                      disable={!condition.emailVerify || condition.emailConfirm}
                      onPress={() =>
                        requestAccountCode({
                          variables: { email: getValues("email") },
                        })
                      }
                    />
                  </RowBox>
                  <NoticSubContext>로그인 시에 사용됩니다</NoticSubContext>
                </>
              ) : (
                <>
                  <RowBox>
                    <TextInput
                      ref={emailRef}
                      placeholder={"인증코드"}
                      returnKeyType={"done"}
                      onChangeText={text => setCode(text)}
                      width={"66%"}
                    />
                    <Button
                      text={"인증코드 확인"}
                      width={"31%"}
                      onPress={accountCodeComparsion}
                    />
                  </RowBox>
                  <NoticSubContext>
                    {`제한시간: ${Math.floor((time / (1000 * 60)) % 60)}분 ${
                      (time / 1000) % 60
                    }초`}
                  </NoticSubContext>
                </>
              )}

              <NoticContext>비밀번호</NoticContext>
              <TextInput
                ref={passwordRef}
                defaultValue={getValues("password")}
                placeholder={"비밀번호"}
                returnKeyType={"next"}
                secureTextEntry={true}
                onSubmitEditing={() => onNext(passwordCheckRef)}
                onChangeText={text => {
                  passwordVerification(text), setValue("password", text);
                }}
                onEndEditing={passwordComparison}
                style={{ marginBottom: 7 }}
              />
              <PasswordCheckInput
                ref={passwordCheckRef}
                defaultValue={getValues("passwordCheck")}
                placeholder={"비밀번호 확인"}
                secureTextEntry={true}
                returnKeyType={"done"}
                passwordChecked={condition.passwordConfirm}
                onChangeText={text => setValue("passwordCheck", text)}
                onEndEditing={passwordComparison}
                onSubmitEditing={() => console.log(condition)}
              />
              <NoticSubContext>
                6-16자/영문 대문자, 소문자, 숫자, 특수문자 중 2가지 이상 조합
              </NoticSubContext>
            </RequiredInputView>
          ) : (
            <SubJoinInputView style={SubjoinInputViewAnimeStyle}>
              <NoticContext>이름</NoticContext>
              <RowBox>
                <TextInput
                  placeholder={"성"}
                  defaultValue={getValues("lastName")}
                  returnKeyType={"next"}
                  autoCapitalize={"none"}
                  onSubmitEditing={() => onNext(firstNameRef)}
                  onChangeText={text => {
                    setValue("lastName", text);
                  }}
                  width={"35%"}
                />
                <TextInput
                  placeholder={"이름"}
                  ref={firstNameRef}
                  defaultValue={getValues("firstName")}
                  returnKeyType={"next"}
                  autoCapitalize={"none"}
                  onSubmitEditing={() => onNext(phoneNumberRef)}
                  onChangeText={text => setValue("firstName", text)}
                  width={"60%"}
                />
              </RowBox>
              <NoticContext>전화번호</NoticContext>
              <RowBox>
                <TextInput
                  placeholder={"전화번호"}
                  ref={phoneNumberRef}
                  defaultValue={getValues("phoneNumber")}
                  keyboardType={"number-pad"}
                  returnKeyType={"done"}
                  onChangeText={text => setValue("phoneNumber", text)}
                  width={"100%"}
                />
              </RowBox>
            </SubJoinInputView>
          )}
        </CreateAccountLayout>
      </Container>
      <Button
        text={"Pocipe 시작하기"}
        width={"100%"}
        radius={"0px"}
        txSize={25}
        disable={
          !condition.userNameConfirm ||
          !condition.emailConfirm ||
          !condition.passwordConfirm ||
          !condition.passwordVerify
        }
        onPress={handleSubmit(onValid)}
      />
    </>
  );
};
