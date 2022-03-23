import React, { useContext, useEffect } from "react";
import { View, Text } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import Svg, { Circle, Path } from "react-native-svg";
import { mix } from "react-native-redash";
import MaskedView from "@react-native-masked-view/masked-view";

import constants from "../../constants";
import { TestStar } from "../../components/Icons";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.bgColor};
`;

const SIZE = constants.window.width - 64;
const AnimatedPath = Animated.createAnimatedComponent(Path);

export default Main = () => {
  const themeContext = useContext(ThemeContext);

  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [progress]);

  const data1 = useDerivedValue(() => {
    const m = mix.bind(null, progress.value);
    return {
      from: {
        x: m(-0.1, -1),
        y: m(0.2, 0.5),
      },
      c1: { x: m(0, 0.5), y: m(0.7, 1) },
      c2: { x: m(1, 0.5), y: m(0.3, 0) },
      to: { x: m(1.1, 2), y: m(0.8, 0.5) },
    };
  });
  const data2 = useDerivedValue(() => {
    const m = mix.bind(null, 1 - progress.value);
    return {
      from: {
        x: m(-0.1, -1),
        y: m(0.2, 0.5),
      },
      c1: { x: m(0, 0.5), y: m(0.7, 1) },
      c2: { x: m(1, 0.5), y: m(0.3, 0) },
      to: { x: m(1.1, 2), y: m(0.8, 0.5) },
    };
  });

  const path1 = useAnimatedProps(() => {
    const { from, c1, c2, to } = data1.value;
    return {
      d: `M ${from.x} ${from.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y} L 1 1 L 0 1 Z`,
    };
  });
  const path2 = useAnimatedProps(() => {
    const { from, c1, c2, to } = data2.value;
    return {
      d: `M ${from.x} ${from.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y} L 1 1 L 0 1 Z`,
    };
  });

  // return (
  //   <Container>
  //     <MaskedView maskElement={<TestStar size={SIZE} />}>
  //       <Svg width={SIZE} height={SIZE} viewBox="0 0 1 1">
  //         <AnimatedPath
  //           fill={themeContext.blurBlueColor + 95}
  //           animatedProps={path}
  //         />
  //       </Svg>
  //     </MaskedView>
  //   </Container>
  // );
  return (
    <Container>
      <MaskedView
        style={{
          height: SIZE,
          width: SIZE,
          backgroundColor: themeContext.lightGreyColor,
        }}
        maskElement={
          <View
            style={{
              backgroundColor: "transparent",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 120,
                color: "black",
                fontWeight: "bold",
              }}
            >
              WAVE
            </Text>
          </View>
        }
      >
        <Svg width={SIZE} height={SIZE} viewBox="0 0 1 1">
          <AnimatedPath fill={"#7496eb" + 80} animatedProps={path1} />
          <AnimatedPath fill={"#00a7b3" + 80} animatedProps={path2} />
        </Svg>
      </MaskedView>
    </Container>
  );
};
