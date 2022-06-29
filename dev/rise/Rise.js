import React, { useEffect } from "react";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";
import { Circle } from "react-native-svg";
import { mix } from "react-native-redash";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default Rise = ({ index, color, isLast = false }) => {
  const progress1 = useSharedValue(0);

  useEffect(() => {
    const duration = 3500;
    const timingOptions = {
      duration: duration,
      easing: Easing.inOut(Easing.ease),
    };
    const pulse = withTiming(1, timingOptions);
    const repeated = withRepeat(pulse, -1);
    progress1.value = withDelay(index * 400, repeated);
  }, []);

  // c -> y -> 0.5 -> 0 -> 1
  const data = useDerivedValue(() => {
    return {
      x: 0.5,
      y: mix(progress1.value, 4, 0.5),
    };
  });

  const path = useAnimatedProps(() => {
    const { x, y } = data.value;
    return {
      cx: x,
      cy: y,
    };
  });

  return (
    <>
      <AnimatedCircle r={1} fill={color} animatedProps={path} />
    </>
  );
};
