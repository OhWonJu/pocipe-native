import React, { useState } from "react";
import AlertModal from "../../../components/AlertModal";

import Container from "../../../components/Container";
import Loader from "../../../components/Loader";


export default FaceBookAuthView = ({
  loading,
  goBack,
  goSignIn,
  isExistUser,
  isExistSNSKey = "none",
}) => {
  const [psVisible, setPsVisible] = useState(false);
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <AuthHeader title={"페이스북 간편 로그인/가입"} leftOnPress={goBack} />
      <Container>
        {isExistUser && isExistSNSKey === "none" && (
          <AlertModal
            context={
              "해당 이메일을 사용하는 계정이 있습니다. 연동 하시겠습니까?"
            }
            isSingleOption={false}
            confirm={() => null}
            cancel={goSignIn}
          />
        )}
      </Container>
    </>
  );
};
