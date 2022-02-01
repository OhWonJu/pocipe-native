import React from "react";
import styled from "styled-components/native";

import AlertModal from "../../../components/AlertModal";
import Container from "../../../components/Container";
import KakaoAuth from "../../../components/Auth/KakaoAuth";
import FacebookAuth from "../../../components/Auth/FacebookAuth";
import TwitterAuth from "../../../components/Auth/TwitterAuth";
import NaverAuth from "../../../components/Auth/NaverAuth";
import AuthPasswordInput from "../../../components/Auth/AuthPasswordInput";
import AuthButton from "../../../components/Auth/AuthButton";

const InputView = styled.View`
  /* height: 28%; */
  flex: 1;
  justify-content: center;
  height: 235px;
  align-items: center;
`;
const NoticContext = styled.Text`
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 3px;
  color: ${props => props.theme.darkGreyColor};
`;
const OpacityBox = styled.View`
  width: 100%;
  align-items: center;
  margin-top: 4px;
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
`;

export default SNSAuthView = ({
  authType,
  loading,
  getSNSInfo,
  goBack,
  goSignIn,
  isExistUser,
  isExistSNSKey = "none",
  userData,
  setUserData,
  modalControl,
  modalVisible,
  setModalVisible,
  handleSubmit,
  onConntectVaild,
  setValue,
}) => {
  const setPassword = text => setValue("password", text);
  const ConnectView = () => {
    return (
      <InputView>
        <TextInput
          value={userData.email}
          placeholder={"이메일"}
          editable={false}
          selectTextOnFocus={false}
        />
        <PasswordBox>
          <AuthPasswordInput
            placeholder={"비밀번호"}
            onChange={setPassword}
            onSubmitEditing={handleSubmit(onConntectVaild)}
          />
        </PasswordBox>
        <NoticContext>
          계정 연결을 위해 기존 Pocipe 계정의 비밀번호를 입력해주세요.
        </NoticContext>
        <OpacityBox>
          <AuthButton
            text={"계정 연결"}
            onPress={handleSubmit(onConntectVaild)}
          />
        </OpacityBox>
      </InputView>
    );
  };

  // authtype: kakao, facebook, twitter, naver //
  return (
    <>
      <AuthHeader title={`${authType} 간편 로그인/가입`} leftOnPress={goBack} />
      {modalControl.type === "exist" && (
        <AlertModal
          context={modalControl.context}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          isSingleOption={true}
          confirm={goSignIn}
        />
      )}
      {modalControl.type === "connect" && (
        <AlertModal
          context={modalControl.context}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          isSingleOption={false}
          cancel={goSignIn}
        />
      )}
      {modalControl.type === "done" ||
        (modalControl.type === "create" && (
          <AlertModal
            context={modalControl.context}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            isSingleOption={modalControl.type === "done" ? true : false}
            confirm={modalControl.confirmCall}
            cancel={goSignIn}
          />
        ))}
      <Container>
        {authType === "카카오" && (
          <KakaoAuth
            loading={loading}
            getSNSInfo={getSNSInfo}
            setUserData={setUserData}
          />
        )}
        {authType === "페이스북" && (
          <FacebookAuth
            loading={loading}
            getSNSInfo={getSNSInfo}
            setUserData={setUserData}
          />
        )}
        {authType === "트위터" && (
          <TwitterAuth
            loading={loading}
            getSNSInfo={getSNSInfo}
            setUserData={setUserData}
          />
        )}
        {authType === "네이버" && (
          <NaverAuth
            loading={loading}
            getSNSInfo={getSNSInfo}
            setUserData={setUserData}
          />
        )}
        {
          // 계정 연결
          isExistUser && isExistSNSKey === "none" && <ConnectView />
        }
      </Container>
    </>
  );
};
