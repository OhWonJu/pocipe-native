// react natvie reanimation 으로 구현한 로더 //

import React from "react";
import Animated, {
  Easing,
  useSharedValue,
  useDerivedValue,
  withTiming,
  withRepeat,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import styled from "styled-components/native";

const Container = styled.View`
  /* position: absolute; */
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 999;
`;
const Loader = styled(Animated.View)`
  height: 100px;
  width: 100px;
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.08);
  border-radius: 60px;
`;
const FoodImage = styled(Animated.Image)`
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

  const blinkAime = useSharedValue(1);
  // 애니메이션 스타일 지정 함수
  const animationStyle = useAnimatedStyle(() => {
    return {
      // opacity 값에 대해 반복적으로 값 변경
      opacity: withRepeat(
        // duration에 따라 1번 인자 값을 전달
        withTiming(
          blinkAime.value,
          {
            duration: 500,
          },
          // callback func
          () => {
            blinkAime.value == 0
              ? (blinkAime.value = 1)
              : (blinkAime.value = 0);
          }
        ),
        -1
      ),
    };
  });

  const index = Math.floor(Math.random() * (foods.length - 1));

  return (
    <FoodImage
      source={foods[index]}
      style={animationStyle}
      resizeMode="center"
    />
  );
};

export default () => {
  // 회전 애니메이션
  const animation = useSharedValue(0);
  // 주어진 애니매이션  값으로부터 파생 -> 보간
  const rotation = useDerivedValue(() => {
    return interpolate(animation.value, [0, 360], [0, 360]);
  });
  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: rotation.value + "deg",
        },
      ],
    };
  });
  // withTiming func를 반복 호출 한다고 보면 될 듯
  animation.value = withRepeat(
    // 값을 360까지 선형으로, 1200ms동안..
    withTiming(360, { duration: 1200, easing: Easing.linear }),
    // 2번 인자가 음수일 경우 무한 반복
    -1
  );

  return (
    <Container>
      <Loader style={animationStyle}>{Foods()}</Loader>
    </Container>
  );
};
