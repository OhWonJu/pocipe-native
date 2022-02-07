import React, { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "styled-components/native";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";

import { userSignIn } from "../../../apollo";
import SignInView from "./SignInView";
import { SIGN_IN_MUTATION } from "./SignInModel";

export default SignInController = ({ navigation, route }) => {
  console.log(route.params);
  const themeContext = useContext(ThemeContext);
  const { register, handleSubmit, getValues, setValue, watch } = useForm({
    defaultValues: {
      // 이렇게 삼항을 줄일수도....? 데이터 보호..
      email: route.params?.email,
      password: route.params?.password,
    },
  });
  const [passwordUnvisible, setPasswordUnvisible] = useState(true);
  const [signButtonOPC, setSignButtonOPC] = useState({
    email: false,
    password: false,
  });
  const [turnOff, setTurnOff] = useState(true);

  const passwordRef = useRef();

  useEffect(() => {
    register("email");
    register("password");
  }, [register]);
  // route로 넘겼는데 defaultValues가 안먹혀서
  // 마운트될때 걍 한번더 줘버렸엉..
  useEffect(() => {
    setValue("email", route.params?.email);
    setValue("password", route.params?.password);
  }, []);

  // Qureys
  // Back-end APIs
  const onCompleted = async data => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      await userSignIn(token);
    }
  };
  const [loginMutation, { loading }] = useMutation(SIGN_IN_MUTATION, {
    onCompleted,
  });

  // react hook form
  const onValid = data => {
    if (!loading) {
      loginMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  // Ref
  const onEmailNext = () => {
    passwordRef?.current?.focus();
  };

  // 로그인 버튼 활성화 관련
  const emailCompleted = text => {
    if (text.length > 6) {
      setSignButtonOPC(prevState => {
        return { ...prevState, email: true };
      });
    } else {
      setSignButtonOPC(prevState => {
        return { ...prevState, email: false };
      });
    }
  };
  const passwordCompleted = text => {
    // 테스트를 위해 len 조절... 원래는 7자 이상
    if (text.length > 3 && text.length < 17) {
      setSignButtonOPC(prevState => {
        return {
          ...prevState,
          password: true,
        };
      });
    } else {
      setSignButtonOPC(prevState => {
        return {
          ...prevState,
          password: false,
        };
      });
    }
  };
  useEffect(() => {
    if (
      (signButtonOPC.email === true && signButtonOPC.password === true) ||
      route.params
    ) {
      setTurnOff(false);
    } else {
      setTurnOff(true);
    }
  }, [signButtonOPC]);

  // password 입력 보안 보기 관련
  const handlePasswordVisible = () => {
    setPasswordUnvisible(!passwordUnvisible);
  };

  // navigate
  const goBack = () => navigation.goBack();
  const goToSignUp = () => {
    navigation.navigate("SignUp");
  };
  const goSNSAuth = type => {
    navigation.navigate("SNSAuth", {
      authType: type,
    });
  };

  return (
    <SignInView
      themeContext={themeContext}
      goBack={goBack}
      goToSignUp={goToSignUp}
      goSNSAuth={goSNSAuth}
      setValue={setValue}
      watch={watch}
      emailCompleted={emailCompleted}
      passwordCompleted={passwordCompleted}
      passwordUnvisible={passwordUnvisible}
      onEmailNext={onEmailNext}
      passwordRef={passwordRef}
      handlePasswordVisible={handlePasswordVisible}
      handleSubmit={handleSubmit}
      onValid={onValid}
      turnOff={turnOff}
    />
  );
};
