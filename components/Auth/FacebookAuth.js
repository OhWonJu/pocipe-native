import React, { useEffect } from "react";
import * as Facebook from "expo-facebook";
import { View, Text } from "react-native";
import Loader from "../Loader";

export default FacebookAuth = ({ setUserData, getSNSInfo, loading }) => {
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
          setUserData(data);
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

  if (loading) {
    return <Loader />;
  }
  return null;
};
