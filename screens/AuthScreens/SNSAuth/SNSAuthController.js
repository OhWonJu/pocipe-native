import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "styled-components/native";
import { useForm } from "react-hook-form";

import { GET_SNS_INFO, SET_SNS_KEY, SNS_SIGN_IN } from "./SNSAuthModel";
import useExcuteQuery from "../../../Hooks/useExcuteQuery";
import SNSAuthView from "./SNSAuthView";
import { useMutation } from "@apollo/client";
import { userSignIn } from "../../../apollo";

export default SNSAuthController = ({ navigation, route }) => {
  const themeContext = useContext(ThemeContext);

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [SNSInfo, setSNSInfo] = useState(null);
  const [authType, setAuthType] = useState("");
  const [modalContext, setModalContext] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const { register, handleSubmit, setValue, watch } = useForm();

  useEffect(() => {
    switch (route.params.authType) {
      case "kakao":
        console.log("ASD");
        setAuthType("카카오");
        break;
      case "facebook":
        setAuthType("페이스북");
        break;
      case "twitter":
        setAuthType("트위터");
        break;
      case "naver":
        setAuthType("네이버");
        break;
    }
  }, []);

  useEffect(() => {
    register("userName");
    register("email");
    register("password");
    register("snsKey");
    register("firstName");
    register("lastName");
    register("phoneNumber");
  });

  useEffect(() => {
    if (SNSInfo && SNSInfo.ok === true) {
      if (SNSInfo.snsKey === "none") {
        setModalVisible(true);
        setModalContext("이미 Pocipe 계정이 있어요. 연결하시겠어요?");
      } else if (SNSInfo.snsKey === "different") {
        setModalVisible(true);
        setModalContext("이미 다른 SNS 계정과 연결되어있어요.");
      } else if (SNSInfo.snsKey === "same") {
        if (!signinLoading) {
          signinMutation({
            variables: {
              email: userData.email,
              snsKey: userData.id,
            },
          });
        }
      }
    }
  }, [SNSInfo]);

  const onCompletedGetSNSInfo = ({ getSNSInfo }) => {
    const { ok, snsKey } = getSNSInfo;
    setSNSInfo({ ok, snsKey });
    setLoading(false);
  };
  const getSNSInfo = useExcuteQuery(GET_SNS_INFO, onCompletedGetSNSInfo);

  const onCompletedSNSSignIn = async data => {
    console.log("SIGN", data);
    const {
      loginWithSNS: { ok, token },
    } = data;
    if (ok) {
      await userSignIn(token);
    }
  };
  const [signinMutation, { loading: signinLoading }] = useMutation(
    SNS_SIGN_IN,
    {
      onCompleted: onCompletedSNSSignIn,
    }
  );

  const onCompletedSetKey = data => {
    console.log("SETKEY:", data);
    if (data.ok) {
      console.log("SIGNLOAD: ",signinLoading)
      if (!signinLoading) {
        console.log("CALL SIGNS");
        signinMutation({
          variables: {
            email: userData.email,
            snsKey: userData.id,
          },
        });
      }
    }
  };
  const [setSNSKeyMutation, { loading: setSNSKeyLoading }] = useMutation(
    SET_SNS_KEY,
    {
      onCompleted: onCompletedSetKey,
    }
  );

  const onConntectVaild = data => {
    if (!setSNSKeyLoading) {
      console.log("CALLED CONNTECT");
      setSNSKeyMutation({
        variables: {
          email: userData.email,
          password: data.password,
          snsKey: userData.id,
        },
      });
    }
  };

  console.log("SNS INFO: ", SNSInfo);
  console.log("USER DATA", userData);
  const goBack = () => navigation.goBack();
  const goSignIn = () => navigation.navigate("SignIn");

  return (
    <SNSAuthView
      authType={authType}
      loading={loading}
      setLoading={setLoading}
      getSNSInfo={getSNSInfo}
      goBack={goBack}
      goSignIn={goSignIn}
      isExistUser={SNSInfo?.ok}
      isExistSNSKey={SNSInfo?.snsKey}
      userData={userData}
      setUserData={setUserData}
      modalContext={modalContext}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      handleSubmit={handleSubmit}
      setValue={setValue}
      watch={watch}
      onConntectVaild={onConntectVaild}
      setValue={setValue}
    />
  );
};
