import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

import AuthHeader from "../../components/Auth/AuthHeader";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default ({ navigation, route }) => {
  const goBack = () => navigation.goBack();

  return (
    <>
      <AuthHeader title={"알림"} leftOnPress={goBack} />
      <View>
        <Text>Your Notifications💙</Text>
      </View>
    </>
  );
};
