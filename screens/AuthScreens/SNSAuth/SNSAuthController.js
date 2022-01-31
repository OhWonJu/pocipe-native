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
  const [modalControl, setModalControl] = useState({
    type: "",
    context: "",
    confirmCall: () => null,
  }); // exist || connect || create || done
  const [modalVisible, setModalVisible] = useState(false);

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      email: userData?.email,
      snsKey: userData?.id,
    },
  });

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
        setModalControl({
          type: "connect",
          context: "이미 Pocipe 계정이 있어요. 연결하시겠어요?",
        });
      } else if (SNSInfo.snsKey === "different") {
        setModalVisible(true);
        setModalControl({
          type: "exist",
          context: "이미 다른 SNS 계정과 연결되어있어요.",
        });
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

  const onCompletedSNSSignIn = data => {
    const {
      loginWithSNS: { ok, token },
    } = data;
    if (ok) {
      setLoading(false);
      setModalVisible(true);
      setModalControl({
        type: "done",
        context: "SNS 계정과 연결되었습니다.",
        confirmCall: async () => await userSignIn(token),
      });
    }
  };
  const [signinMutation, { loading: signinLoading }] = useMutation(
    SNS_SIGN_IN,
    {
      onCompleted: onCompletedSNSSignIn,
    }
  );

  const onCompletedSetKey = ({ setSNSKey }) => {
    if (setSNSKey.ok) {
      if (!signinLoading) {
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
      setLoading(true);
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
      modalControl={modalControl}
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
