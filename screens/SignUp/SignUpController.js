import React, { useEffect, useRef, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

import SignUpView from "./SignUpView";
import {
  CREATE_ACCOUNT,
  REQUEST_ACCOUNT_CODE,
  SEARCH_USER,
} from "./SignUpModel";

const LIMIT_TIME = 1000 * 180;

export default CreateAccount = ({ navigation }) => {
  // 가입버튼 제어를 위한 state
  const [condition, setCondition] = useState({
    userNameVaild: false, // 최소 길이 및 조건 만족 여부
    userNameConp: false, // 중복 체크 여부
    emailVaild: false,
    emailConp: false, // 이메일 인증 여부
    accountCode: "",
    passwordVaild: false, // 최소 길이 및 조건 만족 여부
    passwordConp: false, // 비밀번호 확인 여부
  });
  const [codeInput, setCodeInput] = useState("");
  // 인증코드 입력 제한 시간
  const [time, setTime] = useState(LIMIT_TIME);
  useEffect(() => {
    if (condition.accountCode !== "") {
      let invalId = setInterval(
        () => setTime(prevTime => prevTime - 1000),
        1000
      );
      setTimeout(() => {
        clearInterval(invalId);
        setCondition(prevState => {
          return { ...prevState, accountCode: "" };
        });
        setTime(LIMIT_TIME);
      }, LIMIT_TIME);
    }
  }, [condition.accountCode]);

  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
  });
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

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordCheckRef = useRef();

  // Back-end APIs
  // 유저명 중복확인 query 성공시
  const onCompletedSearch = ({ seeProfile }) => {
    if (!searchLoading && seeProfile === null) {
      setCondition(prevState => {
        // 호출 결과를 즉시 받기 위헤 setState 안에서 호출
        alert("사용 가능한 아이디입니다.");
        return { ...prevState, userNameConp: true };
      });
      // hooks에서 setValue한 직후에는 이전 값을 나타냄..
      // rerender 하기 전에 뿌리고 rendering 되니까 그런듯
    } else {
      setCondition(prevState => {
        alert("이미 사용중인 아이디입니다.");
        return { ...prevState, userNameConp: false };
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

  const onCompletedRequestCode = ({ requestAccountCode }) => {
    console.log(requestAccountCode);
    if (!requestCodeLoading) {
      if (requestAccountCode.ok) {
        setCondition(prevState => {
          return { ...prevState, accountCode: requestAccountCode.code };
        });
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
    // if (!createLoading) {
    //   createAccountMutation({
    //     variables: {
    //       firstName: data.firstName,
    //       lastName: data.lastName,
    //       userName: data.userName,
    //       email: data.email,
    //       password: data.password,
    //       phoneNumber: data.phoneNumber,
    //     },
    //   });
    // }
  };

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
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const emailCompleted = text => {
    if (text.length > 6) {
      if (emailRegex.test(text)) {
        setCondition(prevState => {
          return { ...prevState, emailVaild: true };
        });
      } else {
        setCondition(prevState => {
          return { ...prevState, emailVaild: false };
        });
      }
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
  const passwordConpration = () => {
    const { password, passwordCheck } = getValues();
    if (password === passwordCheck) {
      setCondition(prevState => {
        return { ...prevState, passwordConp: true };
      });
    } else {
      setCondition(prevState => {
        return { ...prevState, passwordConp: false };
      });
    }
  };

  const confirmAccountCode = () => {
    if (codeInput === condition.accountCode) {
      setCondition(prevState => {
        return { ...prevState, emailConp: true, accountCode: "" };
      });
    } else {
      setCondition(prevState => {
        return { ...prevState, emailConp: false };
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
      requestAccountCode={requestAccountCode}
      time={time}
      emailCompleted={emailCompleted}
      confirmAccountCode={confirmAccountCode}
      setCodeInput={setCodeInput}
      passwordCompleted={passwordCompleted}
      passwordConpration={passwordConpration}
      handleSubmit={handleSubmit}
      onValid={onValid}
    />
  );
};
