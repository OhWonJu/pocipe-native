import React from "react";
import styled from "styled-components/native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";

import constants from "../../constants";

const BlurGround = styled(Animated.View)`
  position: absolute;
  height: ${constants.height}px;
  width: ${constants.width}px;
  background-color: rgb(0, 0, 0);
  z-index: 999;
`;

export default ModalFade = ({ modalVisible, close = () => null }) => {
  const animationKey = useDerivedValue(() => (modalVisible ? 1 : 0));
  const BlurZIndex = useDerivedValue(() => {
    return interpolate(animationKey.value, [0, 1], [-1, 2], Extrapolate.CLAMP);
  });
  const BlurOpacity = useDerivedValue(() => {
    return interpolate(
      animationKey.value,
      [0, 1],
      [0, 0.25],
      Extrapolate.CLAMP
    );
  });
  const BlurAnimeStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(BlurOpacity.value, {
        duration: 600,
        easing: Easing.ease,
      }),
      zIndex: BlurZIndex.value,
    };
  });

  return <BlurGround style={BlurAnimeStyle}></BlurGround>;
};
