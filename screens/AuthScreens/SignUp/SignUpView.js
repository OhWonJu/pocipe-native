import React from "react";
import { SafeAreaView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

import AuthGuide from "../../../components/Auth/AuthGuide";
import AuthHeader from "../../../components/Auth/AuthHeader";
import Button from "../../../components/Button";
import Container from "../../../components/Container";
import constants from "../../../constants";

import { globalStyles } from "../../../Styles/GlobalStyles";

const WelcomeView = styled.View`
  width: ${constants.width}px;
  right: 20px;
  /* height: 20%; */
  height: 120px;
  padding: 0px 10px 0px 10px;
  margin-bottom: 15px;
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
  padding-top: 10px;
  padding-bottom: 3px;
  color: ${(props) => props.theme.darkGreyColor};
`;
const NoticSubContext = styled.Text`
  font-size: 12px;
  padding-bottom: 5px;
  color: ${(props) => props.theme.darkGreyColor};
`;

const TextInput = styled.TextInput`
  background-color: ${(props) => props.theme.lightGreyColor};
  height: 50px;
  width: ${(props) => (props.width ? props.width : "100%")};
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 2px;
`;

const PasswordCheckInput = styled.TextInput`
  background-color: ${(props) => props.theme.lightGreyColor};
  height: 50px;
  width: ${(props) => (props.width ? props.width : "100%")};
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 2px;
  border: ${(props) => (props.passwordChecked ? 0 : 1)}px;
  border-color: ${(props) => props.theme.redColor};
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
      <AuthHeader title={"????????????"} leftOnPress={goBack} />
      <Container>
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
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          {trigger == 1 ? (
            <RequiredInputView style={requiredInputAnimeStyle}>
              <NoticContext>?????????</NoticContext>
              <RowBox>
                <TextInput
                  placeholder={"?????????"}
                  defaultValue={getValues("userName")}
                  returnKeyType={"next"}
                  autoCapitalize={"none"}
                  onSubmitEditing={() => onNext(emailRef)}
                  onChangeText={(text) => {
                    userNameVerification(text), setValue("userName", text);
                  }}
                  width={"66%"}
                />
                <Button
                  text={"????????????"}
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
                4-12???/??????, ?????? ?????????(?????? ?????? ??????) {`\n`}
                Pocipe ????????? ????????? ???????????????.
              </NoticSubContext>

              <NoticContext>?????????</NoticContext>
              {emailCode === "" ? (
                <>
                  <RowBox>
                    <TextInput
                      ref={emailRef}
                      defaultValue={getValues("email")}
                      placeholder={"?????????"}
                      keyboardType={"email-address"}
                      returnKeyType={"next"}
                      onSubmitEditing={() => onNext(passwordRef)}
                      onChangeText={(text) => {
                        emailVerification(text), setValue("email", text);
                      }}
                      editable={condition.emailConfirm ? false : true}
                      width={"66%"}
                    />
                    <Button
                      text={"???????????? ??????"}
                      width={"31%"}
                      disable={!condition.emailVerify || condition.emailConfirm}
                      onPress={() =>
                        requestAccountCode({
                          variables: { email: getValues("email") },
                        })
                      }
                    />
                  </RowBox>
                  <NoticSubContext>????????? ?????? ???????????????</NoticSubContext>
                </>
              ) : (
                <>
                  <RowBox>
                    <TextInput
                      ref={emailRef}
                      placeholder={"????????????"}
                      returnKeyType={"done"}
                      onChangeText={(text) => setCode(text)}
                      width={"66%"}
                    />
                    <Button
                      text={"???????????? ??????"}
                      width={"31%"}
                      onPress={accountCodeComparsion}
                    />
                  </RowBox>
                  <NoticSubContext>
                    {`????????????: ${Math.floor((time / (1000 * 60)) % 60)}??? ${
                      (time / 1000) % 60
                    }???`}
                  </NoticSubContext>
                </>
              )}

              <NoticContext>????????????</NoticContext>
              <TextInput
                ref={passwordRef}
                defaultValue={getValues("password")}
                placeholder={"????????????"}
                returnKeyType={"next"}
                secureTextEntry={true}
                onSubmitEditing={() => onNext(passwordCheckRef)}
                onChangeText={(text) => {
                  passwordVerification(text), setValue("password", text);
                }}
                onEndEditing={passwordComparison}
                style={{ marginBottom: 7 }}
              />
              <PasswordCheckInput
                ref={passwordCheckRef}
                defaultValue={getValues("passwordCheck")}
                placeholder={"???????????? ??????"}
                secureTextEntry={true}
                returnKeyType={"done"}
                passwordChecked={condition.passwordConfirm}
                onChangeText={(text) => setValue("passwordCheck", text)}
                onEndEditing={passwordComparison}
                onSubmitEditing={() => console.log(condition)}
              />
              <NoticSubContext>
                6-16???/?????? ?????????, ?????????, ??????, ???????????? ??? 2?????? ?????? ??????
              </NoticSubContext>
            </RequiredInputView>
          ) : (
            <SubJoinInputView style={SubjoinInputViewAnimeStyle}>
              <NoticContext>??????</NoticContext>
              <RowBox>
                <TextInput
                  placeholder={"???"}
                  defaultValue={getValues("lastName")}
                  returnKeyType={"next"}
                  autoCapitalize={"none"}
                  onSubmitEditing={() => onNext(firstNameRef)}
                  onChangeText={(text) => {
                    setValue("lastName", text);
                  }}
                  width={"35%"}
                />
                <TextInput
                  placeholder={"??????"}
                  ref={firstNameRef}
                  defaultValue={getValues("firstName")}
                  returnKeyType={"next"}
                  autoCapitalize={"none"}
                  onSubmitEditing={() => onNext(phoneNumberRef)}
                  onChangeText={(text) => setValue("firstName", text)}
                  width={"60%"}
                />
              </RowBox>
              <NoticContext>????????????</NoticContext>
              <RowBox>
                <TextInput
                  placeholder={"????????????"}
                  ref={phoneNumberRef}
                  defaultValue={getValues("phoneNumber")}
                  keyboardType={"number-pad"}
                  returnKeyType={"done"}
                  onChangeText={(text) => setValue("phoneNumber", text)}
                  width={"100%"}
                />
              </RowBox>
            </SubJoinInputView>
          )}
        </KeyboardAwareScrollView>
      </Container>
      <Button
        text={"Pocipe ????????????"}
        width={"100%"}
        radius={0}
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
