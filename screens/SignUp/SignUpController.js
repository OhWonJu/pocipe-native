import React, { useEffect, useRef, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import SignUpView from "./SignUpView";
import {
  CREATE_ACCOUNT,
  REQUEST_ACCOUNT_CODE,
  SEARCH_USER,
} from "./SignUpModel";

const LIMIT_TIME = 1000 * 180;
const EMAIL_REX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default CreateAccount = ({ navigation }) => {
  // 가입버튼 제어를 위한 state
  const [condition, setCondition] = useState({
    userNameVerify: false, // 유저명 양식
    userNameConfirm: false, // 유저명 중복 확인
    emailVerify: false, // 이메일 양식 확인
    emailConfirm: false, // 이메일 인증 여부
    passwordVerify: false, // 비밀번호 양식
    passwordConfirm: false, // 비밀번호 확인 여부
  });
  const [emailCode, setEmailCode] = useState("");
  const [codeInput, setCodeInput] = useState("");
  // 인증코드 입력 제한 시간
  const [time, setTime] = useState(LIMIT_TIME);
  // forms
  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
  });
  // refs
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordCheckRef = useRef();

  // forms useEffect
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
    register("accountCode");
    register("firstName");
    register("lastName");
    register("phoneNumber");
  }, [register]);

  // timer Effects
  useEffect(() => {
    if (emailCode !== "") {
      let intervalId = setInterval(
        () => setTime(prevTime => prevTime - 1000),
        1000
      );
      let timerId = setTimeout(() => {
        clearInterval(intervalId);
        setEmailCode("");
        setTime(LIMIT_TIME);
      }, LIMIT_TIME);
    }
  }, [emailCode]);

  // Back-end APIs
  // 유저명 중복확인 query 성공시
  const onCompletedSearch = ({ seeProfile }) => {
    if (!searchLoading && seeProfile === null) {
      setCondition(prevState => {
        // 호출 결과를 즉시 받기 위헤 setState 안에서 호출
        alert("사용 가능한 아이디입니다.");
        return { ...prevState, userNameConfirm: true };
      });
      // hooks에서 setValue한 직후에는 이전 값을 나타냄..
      // rerender 하기 전에 뿌리고 rendering 되니까 그런듯
    } else {
      setCondition(prevState => {
        alert("이미 사용중인 아이디입니다.");
        return { ...prevState, userNameConfirm: false };
      });
    }
  };
  const [searchExistUserName, { loading: searchLoading }] = useLazyQuery(
    SEARCH_USER,
    {
      // query 호출 결과 인자 중 data인자를 callback에 전달
      onCompleted: onCompletedSearch,
    }
  );

  // 인증 코드 발송
  const onCompletedRequestCode = ({ requestAccountCode }) => {
    console.log(requestAccountCode);
    if (!requestCodeLoading) {
      if (requestAccountCode.ok) {
        setEmailCode(requestAccountCode.code);
      } else if (requestAccountCode.error === "Email exist.") {
        alert("이미 사용중인 이메일입니다.");
      } else {
        alert("이메일 발송에 실패했습니다.");
      }
    }
  };
  const [requestAccountCode, { loading: requestCodeLoading }] = useLazyQuery(
    REQUEST_ACCOUNT_CODE,
    {
      onCompleted: onCompletedRequestCode,
    }
  );

  const onCompletedCreate = data => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      const { email, password } = getValues();
      //                     name, params
      navigation.navigate("SignIn", {
        email,
        password,
      });
    }
  };
  const [createAccountMutation, { loading: createLoading }] = useMutation(
    CREATE_ACCOUNT,
    {
      onCompleted: onCompletedCreate,
    }
  );

  // Form Hook
  const onValid = data => {
    console.log(data);
    console.log(condition);
    if (!createLoading) {
      createAccountMutation({
        variables: {
          firstName: data.firstName,
          lastName: data.lastName,
          userName: data.userName,
          email: data.email,
          password: data.password,
          phoneNumber: data.phoneNumber,
        },
      });
    }
  };

  // 버튼 활성화 관련
  const userNameVerification = text => {
    if (text.length > 3) {
      setCondition(prevState => {
        return { ...prevState, userNameVerify: true };
      });
    } else {
      setCondition(prevState => {
        return { ...prevState, userNameVerfiy: false };
      });
    }
  };

  const emailVerification = text => {
    if (text.length > 6) {
      if (EMAIL_REX.test(text)) {
        setCondition(prevState => {
          return { ...prevState, emailVerify: true };
        });
      } else {
        setCondition(prevState => {
          return { ...prevState, emailVerify: false };
        });
      }
    } else {
      setCondition(prevState => {
        return { ...prevState, emailVaild: false };
      });
    }
  };
  const passwordVerification = text => {
    if (text.length > 6 && text.length < 17) {
      setCondition(prevState => {
        return { ...prevState, passwordVerify: true };
      });
    } else {
      setCondition(prevState => {
        return { ...prevState, passwordVerify: false };
      });
    }
  };
  const passwordComparison = () => {
    const { password, passwordCheck } = getValues();
    if (password === passwordCheck) {
      setCondition(prevState => {
        return { ...prevState, passwordConfirm: true };
      });
    } else {
      setCondition(prevState => {
        return { ...prevState, passwordConfirm: false };
      });
    }
  };
  const accountCodeComparsion = () => {
    if (codeInput === emailCode) {
      setCondition(prevState => {
        return { ...prevState, emailConfirm: true };
      });
      setEmailCode("");
    } else {
      alert("이메일 인증 코드가 맞지 않습니다.");
      setCondition(prevState => {
        return { ...prevState, emailConfirm: false };
      });
    }
  };

  // ref
  const onNext = next => {
    next?.current?.focus();
  };

  const goBack = () => navigation.goBack();

  const [trigger, setTrigger] = useState(1);
  const animationKey = useSharedValue(1);
  const requiredInputViewX = useDerivedValue(() => {
    return interpolate(animationKey.value, [0, 1], [100, 0], Extrapolate.CLAMP);
  });
  const SubjoinInputViewZIndex = useDerivedValue(() => {
    return interpolate(animationKey.value, [0, 1], [1, -1], Extrapolate.CLAMP);
  });
  const SubJoinViewX = useDerivedValue(() => {
    return interpolate(animationKey.value, [0, 1], [0, 100], Extrapolate.CLAMP);
  });
  const SubJoinViewOpacity = useDerivedValue(() => {
    return interpolate(animationKey.value, [0, 1], [1, 0], Extrapolate.CLAMP);
  });

  const controlTrigger = () => {
    trigger == 0 ? setTrigger(1) : setTrigger(0);
  };
  const openEvent = () => {
    animationKey.value = 0;
    setTrigger(0);
  };
  const closeEvent = () => {
    animationKey.value = 1;
    setTrigger(1);
  };

  const requiredInputAnimeStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(animationKey.value, {
        duration: 300,
      }),
      transform: [
        {
          translateX: withTiming(requiredInputViewX.value, {
            duration: 300,
          }),
        },
      ],
    };
  });
  const SubjoinInputViewAnimeStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(SubJoinViewOpacity.value, {
        duration: 300,
      }),
      zIndex: withTiming(SubjoinInputViewZIndex.value, {
        duration: 300,
      }),
      transform: [
        {
          translateX: withTiming(SubJoinViewX.value, {
            duration: 300,
          }),
        },
      ],
    };
  });

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
      searchExistUserName={searchExistUserName}
      userNameVerification={userNameVerification}
      emailCode={emailCode}
      requestAccountCode={requestAccountCode}
      emailVerification={emailVerification}
      setCode={setCodeInput}
      accountCodeComparsion={accountCodeComparsion}
      time={time}
      passwordVerification={passwordVerification}
      passwordComparison={passwordComparison}
      handleSubmit={handleSubmit}
      onValid={onValid}
      trigger={trigger}
      controlTrigger={controlTrigger}
      animationKey={animationKey}
      openEvent={openEvent}
      closeEvent={closeEvent}
    />
  );
};
