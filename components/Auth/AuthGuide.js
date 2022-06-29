import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemeContext } from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  background-color: ${props => props.theme.bgColor};
`;
const Left = styled(Animated.View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.disable ? "0" : "1")};
`;
const Right = styled(Animated.View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.disable ? "0" : "1")};
`;
const Button = styled(Animated.View)`
  height: 25px;
  width: 25px;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 15px;
  align-items: center;
  justify-content: center;
`;
const Content = styled.View`
  flex: 10;
`;
const MainText = styled(Animated.Text)`
  color: ${props => props.theme.yellowColor};
  font-weight: 700;
  font-size: 40px;
  top: 25%;
  left: 2%;
`;
const SubText = styled(Animated.Text)`
  color: ${props => props.theme.yellowColor};
  font-size: ${props => (props.txSize ? props.txSize : 15)}px;
  font-weight: 700;
  top: 28%;
  left: ${props => (props.left ? props.left : 2)}%;
`;

// step에 따라 뷰 변경
const AuthGuide = ({ guideKey, trigger, openEvent, closeEvent }) => {
  const themeContext = useContext(ThemeContext);
  const step = useDerivedValue(() => trigger);

  const [firstAnimeKey, setFirstAnimeKey] = useState(0);
  useEffect(() => {
    if (guideKey == 1) {
      setFirstAnimeKey(0);
      setTimeout(() => {
        setFirstAnimeKey(guideKey);
      }, 300);
    }
  }, []);

  //console.log(a);

  const firstY = useDerivedValue(() => {
    return interpolate(firstAnimeKey, [0, 1], [10, 0], Extrapolate.CLAMP);
  });
  const secondY = useDerivedValue(() => {
    return interpolate(guideKey, [0, 1], [0, 10], Extrapolate.CLAMP);
  });
  const secondZIndex = useDerivedValue(() => {
    return interpolate(guideKey, [0, 1], [1, -1], Extrapolate.CLAMP);
  });
  const firstOpacity = useDerivedValue(() => {
    return interpolate(firstAnimeKey, [0, 1], [0, 1], Extrapolate.CLAMP);
  });
  const secondOpacity = useDerivedValue(() => {
    return interpolate(guideKey, [0, 1], [1, 0], Extrapolate.CLAMP);
  });
  const leftButtonOpacity = useDerivedValue(() => {
    return interpolate(step.value, [0, 1], [1, 0], Extrapolate.CLAMP);
  });
  const rightButtonOpacity = useDerivedValue(() => {
    return interpolate(step.value, [0, 1], [0, 1], Extrapolate.CLAMP);
  });

  const firstMainTextAnimeStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(firstOpacity.value, {
        duration: 700,
      }),
      transform: [
        {
          translateY: withTiming(firstY.value, {
            duration: 700,
          }),
        },
      ],
    };
  });
  const firstSubTextAnimeStyle = useAnimatedStyle(() => {
    return {
      opacity: withDelay(
        500,
        withTiming(firstOpacity.value, {
          duration: 300,
        })
      ),
      transform: [
        {
          translateY: withDelay(
            500,
            withTiming(firstY.value, {
              duration: 300,
            })
          ),
        },
      ],
    };
  });

  const secondMainTextAnimeStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(secondOpacity.value, {
        duration: 700,
      }),
      zIndex: withTiming(secondZIndex.value, {
        duration: 700,
      }),
      transform: [
        {
          translateY: withTiming(secondY.value, {
            duration: 500,
          }),
        },
      ],
    };
  });
  const secondSubTextAnimeStyle = useAnimatedStyle(() => {
    return {
      opacity: withDelay(
        500,
        withTiming(secondOpacity.value, {
          duration: 300,
        })
      ),
      zIndex: withDelay(500, withTiming(secondZIndex.value, { duration: 300 })),
      transform: [
        {
          translateY: withDelay(
            500,
            withTiming(secondY.value, {
              duration: 300,
            })
          ),
        },
      ],
    };
  });

  const leftButtonAnimeStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(leftButtonOpacity.value, {
        duration: 300,
      }),
    };
  });
  const rightButtonAnimeStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(rightButtonOpacity.value, {
        duration: 300,
      }),
    };
  });

  return (
    <Container>
      <Left disable={guideKey}>
        <TouchableOpacity onPress={closeEvent}>
          <Button style={leftButtonAnimeStyle}>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={18}
              color={themeContext.blackColor}
              style={{ transform: [{ rotate: "180deg" }] }}
            />
          </Button>
        </TouchableOpacity>
      </Left>
      <Content>
        {guideKey === 1 ? (
          <>
            <MainText style={firstMainTextAnimeStyle}>{"반가워요 :)"}</MainText>
            <SubText style={firstSubTextAnimeStyle} left={8}>
              손 안의 작은 레시피 Pocipe를 시작해볼까요?
            </SubText>
          </>
        ) : (
          <>
            <MainText style={secondMainTextAnimeStyle}>더 많은 혜택!</MainText>
            <SubText style={secondSubTextAnimeStyle} left={2} txSize={14}>
              추가 정보를 입력하면 더 많은 혜택을 받을 수 있어요.
            </SubText>
          </>
        )}
      </Content>
      <Right disable={guideKey}>
        <TouchableOpacity onPress={openEvent}>
          <Button style={rightButtonAnimeStyle}>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={18}
              color={themeContext.blackColor}
            />
          </Button>
        </TouchableOpacity>
      </Right>
    </Container>
  );
};

export default AuthGuide;
