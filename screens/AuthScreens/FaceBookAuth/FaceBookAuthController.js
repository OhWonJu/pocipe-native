import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "styled-components/native";
import * as Facebook from "expo-facebook";
import { useLazyQuery, useQuery } from "@apollo/client";

import FaceBookAuthView from "./FaceBookAuthView";
import Loader from "../../../components/Loader";
import { GET_SNS_INFO } from "./FaceBookAuthModel";
import useExcuteQuery from "../../../Hooks/useExcuteQuery";

export default FaceBookAuthController = ({ navigation }) => {
  const themeContext = useContext(ThemeContext);

  const [loading, setLoading] = useState(true);
  const [SNSInfo, setSNSInfo] = useState(null);

  const facebookSignIn = async () => {
    try {
      await Facebook.initializeAsync({
        // 앱 아이디
        appId: "953549025266085",
      });
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          // 더 많은 퍼미션 옵션 확인 -> https://developers.facebook.com/docs/permissions/reference#---------
          permissions: ["public_profile", "email"],
        });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          // get 방식으로? 일부 필드를 전달 받을 수 있음.
          // 간편 가입도 구현해봐야할둣..
          `https://graph.facebook.com/me?access_token=${token}&fields=id,last_name,first_name,email`
        );
        const data = await response.json();
        return data;
      } else {
        // type === 'cancel'
        return null;
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  useEffect(() => {
    const prepare = async () => {
      try {
        const data = await facebookSignIn();
        if (data) {
          getSNSInfo({
            variables: {
              email: data?.email,
              snsKey: data?.id,
            },
          });
        }
      } catch (e) {
        console.warn(e);
      }
    };
    prepare();
  }, []);

  const onCompletedGetSNSInfo = ({ getSNSKey }) => {
    const { ok, snsKey } = getSNSKey;
    setSNSInfo({ ok, snsKey });
    setLoading(false);
  };
  const getSNSInfo = useExcuteQuery(GET_SNS_INFO, onCompletedGetSNSInfo);

  console.log("SNS INFO: ", SNSInfo);
  const goBack = () => navigation.goBack();

  return (
    <FaceBookAuthView
      loading={loading}
      goBack={goBack}
    />
  );
};
