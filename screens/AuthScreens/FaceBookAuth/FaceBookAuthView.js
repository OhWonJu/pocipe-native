import React from "react";
import { View, Text } from "react-native";
import AlertModal from "../../../components/AlertModal";

import Container from "../../../components/Container";
import Loader from "../../../components/Loader";

export default FaceBookAuthView = ({
  loading,
  goBack,
}) => {
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <AuthHeader title={"페이스북 간편 로그인/가입"} leftOnPress={goBack} />
      <Container>
        <Text>Hi</Text>
      </Container>
    </>
  );
};
