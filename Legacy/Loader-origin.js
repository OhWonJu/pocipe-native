import React, { useState, useEffect } from "react";
import { Animated, Easing } from "react-native";
import { Keyframe } from "react-native-reanimated";
import styled from "styled-components/native";

const Container = styled.View`
  position: absolute;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
const Loader = styled(Animated.View)`
  height: 120px;
  width: 120px;
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.08);
  border-radius: 60px;
`;
const FoodImage = styled.Image`
  height: 100%;
  width: 100%;
`;

const Foods = () => {
  const foods = [
    require("../assets/loaderImages/001.png"),
    require("../assets/loaderImages/002.png"),
    require("../assets/loaderImages/003.png"),
    require("../assets/loaderImages/004.png"),
    require("../assets/loaderImages/005.png"),
    require("../assets/loaderImages/006.png"),
    require("../assets/loaderImages/007.png"),
    require("../assets/loaderImages/008.png"),
    require("../assets/loaderImages/001.png"),
    require("../assets/loaderImages/002.png"),
    require("../assets/loaderImages/003.png"),
    require("../assets/loaderImages/004.png"),
    require("../assets/loaderImages/005.png"),
    require("../assets/loaderImages/006.png"),
    require("../assets/loaderImages/007.png"),
    require("../assets/loaderImages/008.png"),
  ];

  const index = Math.floor(Math.random() * (foods.length - 1));

  return <FoodImage source={foods[index]} resizeMode="center" />;
};

export default () => {
  const [spinAnim, setSpinAnim] = useState(new Animated.Value(0));
  // animation style
  const spin = spinAnim.interpolate({
    // 보간 - 정수가 아닌 다른 형식을 사용할 때 (커스텀 값) 사용, 주로 colors나 rotation
    inputRange: [0, 1], // anime 값의 범위
    outputRange: ["0deg", "360deg"], // 보간 된 값이 inpytRange에 맵핑된 결과 0에서 1로 변경되면 0deg에서 36000deg
  });
  const loop = Animated.loop(
    Animated.timing(spinAnim, {
      // 정해진 타이밍에 따라 easing...
      toValue: 1, // 밸류의 변경 방향...이동이라면 좌표 이동이겠지
      duration: 2000, // 지속 시간
      easing: Easing.linear,
      //easing: Easing.ease,
      useNativeDriver: true, // js 수행이 아닌 native의 ui처리를 통해 성능 up
    })
  );
  useEffect(() => {
    loop.start();
    return () => {
      loop.stop();
    };
  }, []);
  // spinAnim에 애니메이션을 주고
  // 보간을 한 것을 변수 spin에 할당
  // spinAnime의 ease에 대한 타이밍을 준것을 loop

  // refresh 할 때 마다 어긋나는게 있음 왤까..?
  // hard reload -> useEffect가 완전히 다시 호출
  // refresh useEffect가 돌고 있음...?

  return (
    <Container>
      <Loader style={{ transform: [{ rotate: spin }] }}>{Foods()}</Loader>
    </Container>
  );
};

// 랜덤 출력기
// const Foods = () => {
//   const foods = [
//     require("../assets/loaderImages/001.png"),
//     require("../assets/loaderImages/002.png"),
//     require("../assets/loaderImages/003.png"),
//     require("../assets/loaderImages/004.png"),
//     require("../assets/loaderImages/005.png"),
//     require("../assets/loaderImages/006.png"),
//     require("../assets/loaderImages/007.png"),
//     require("../assets/loaderImages/008.png"),
//     require("../assets/loaderImages/001.png"),
//     require("../assets/loaderImages/002.png"),
//     require("../assets/loaderImages/003.png"),
//     require("../assets/loaderImages/004.png"),
//     require("../assets/loaderImages/005.png"),
//     require("../assets/loaderImages/006.png"),
//     require("../assets/loaderImages/007.png"),
//     require("../assets/loaderImages/008.png"),
//   ];

//   const index = Math.floor(Math.random() * (foods.length - 1));
//   const [trigger, setTrigger] = useState(0);
//   useEffect(() => {
//     const changeFoods = setTimeout(() => {
//       if (trigger == 0) {
//         setTrigger(1);
//       } else {
//         setTrigger(0);
//       }
//     }, 800);
//     return () => clearTimeout(changeFoods); // 컴포넌트 종료 할 때 clean up - timeout 변수 작동 종료
//   }, [trigger]); // deps가 없으면 무한 루프..

//   return <FoodImage source={foods[index]} resizeMode="center" />;
// };
