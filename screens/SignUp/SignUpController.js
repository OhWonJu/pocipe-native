import React, { useEffect, useRef, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { useForm } from "react-hook-form";

import SignUpView from "./SignUpView";
import { SEARCH_USER } from "./SignUpModel";

export default CreateAccount = ({ navigation }) => {
  // 가입버튼 제어를 위한 state
  const [condition, setCondition] = useState({
    userNameVaild: false, // 최소 길이 및 조건 만족 여부
    userNameConf: false, // 중복 체크 여부
    emailVaild: false,
    emailConf: false, // 이메일 인증 여부
    passwordVaild: false, // 최소 길이 및 조건 만족 여부
    passwordConf: false, // 비밀번호 확인 여부
  });
  const { register, handleSubmit, setValue, getValues } = useForm();

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordCheckRef = useRef();

  // Back-end APIs
  // 유저명 중복확인 query 성공시
  const onCompletedSearch = ({ seeProfile }) => {
    if (seeProfile === null) {
      setCondition(prevState => {
        // 호출 결과를 즉시 받기 위헤 setState 안에서 호출
        alert("사용 가능한 아이디입니다.");
        return { ...prevState, userNameConf: true };
      });
      // hooks에서 setValue한 직후에는 이전 값을 나타냄..
      // rerender 하기 전에 뿌리고 rendering 되니까 그런듯
    } else {
      setCondition(prevState => {
        alert("이미 사용중인 아이디입니다.");
        return { ...prevState, userNameConf: false };
      });
    }
  };
  const [searchExistUserName, { loading }] = useLazyQuery(SEARCH_USER, {
    // query 호출 결과 인자 중 data인자를 callback에 전달
    onCompleted: onCompletedSearch,
  });

  // Form Hook
  const onValid = data => {
    console.log(data);
    console.log(condition);
  };

  useEffect(() => {
    register("userName", {
      required: true,
    });
    register("email", {
      required: true,
    });
    register("password", {
      required: true,
    });
    register("passwordCheck", {
      required: true,
    });
  }, [register]);

  // 버튼 활성화 관련
  const userNameCompleted = text => {
    if (text.length > 3) {
      setCondition(prevState => {
        return { ...prevState, userNameVaild: true };
      });
    } else {
      setCondition(prevState => {
        return { ...prevState, userNameVaild: false };
      });
    }
  };
  const emailCompleted = text => {
    if (text.length > 6) {
      setCondition(prevState => {
        return { ...prevState, emailVaild: true };
      });
    } else {
      setCondition(prevState => {
        return { ...prevState, emailVaild: false };
      });
    }
  };
  const passwordCompleted = text => {
    if (text.length > 6 && text.length < 17) {
      setCondition(prevState => {
        return { ...prevState, passwordVaild: true };
      });
    } else {
      setCondition(prevState => {
        return { ...prevState, passwordVaild: false };
      });
    }
  };

  // ref
  const onNext = next => {
    next?.current?.focus();
  };

  const goBack = () => navigation.goBack();

  return (
    <SignUpView
      condition={condition}
      emailRef={emailRef}
      passwordRef={passwordRef}
      passwordCheckRef={passwordCheckRef}
      onNext={onNext}
      goBack={goBack}
      setValue={setValue}
      getValues={getValues}
      userNameCompleted={userNameCompleted}
      searchExistUserName={searchExistUserName}
      emailCompleted={emailCompleted}
      passwordCompleted={passwordCompleted}
      handleSubmit={handleSubmit}
      onValid={onValid}
    />
  );
};
