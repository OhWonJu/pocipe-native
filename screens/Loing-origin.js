import React from "react";
import { StyleSheet, View } from "react-native";
import styled from "styled-components";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { TapGestureHandler } from "react-native-gesture-handler";
import Svg, { Image, Circle, ClipPath } from "react-native-svg";

import constants from "../constants";
import Button from "../components/AuthButton";
import AuthInput from "../components/AuthInput";

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.bgColor};
  justify-content: flex-end;
`;
const ImageBackGroundView = styled(Animated.View)`
  position: absolute;
  height: ${constants.height - 30}px;
`;
const ButtonContainer = styled.View`
  height: ${constants.height / 3}px;
`;
const LogInView = styled(Animated.View)`
  /* top: 2%; */
  /* height: ${constants.height / 3}px; */
  bottom: 3%;
  align-items: center;
`;
const SignInView = styled(Animated.View)`
  top: null;
  height: ${constants.height / 4}px;
  justify-content: center;
  align-items: center;
  z-index: -1;
`;
const SignButton = styled(Animated.View)`
  margin: 3px 50px;
  height: 60px;
  padding: 10px;
  width: ${constants.width / 1.2}px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.bgColor};
`;
const Text = styled.Text`
  color: ${props => props.txColor};
  font-weight: 700;
  font-size: ${props => (props.txSize ? props.txSize : "19")}px;
`;
const CloseButton = styled(Animated.View)`
  height: 60px;
  width: 60px;
  background-color: ${props => props.theme.bgColor};
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -95px;
  left: ${constants.width / 2 - 30}px;
`;

export default LogIn = ({ navigation }) => {
  const animationKey = useSharedValue(1);
  const backgroundY = useDerivedValue(() => {
    return interpolate(
      animationKey.value,
      [0, 1],
      [-constants.height / 2.35, 0],
      Extrapolate.CLAMP
    );
  });
  const logInViewY = useDerivedValue(() => {
    return interpolate(animationKey.value, [0, 1], [100, 0], Extrapolate.CLAMP);
  });
  const signInZIndex = useDerivedValue(() => {
    return interpolate(animationKey.value, [0, 1], [1, -1], Extrapolate.CLAMP);
  });
  const signInY = useDerivedValue(() => {
    return interpolate(animationKey.value, [0, 1], [0, 100], Extrapolate.CLAMP);
  });
  const signInOpacity = useDerivedValue(() => {
    return interpolate(animationKey.value, [0, 1], [1, 0], Extrapolate.CLAMP);
  });

  const _buttonPressEvent = useAnimatedGestureHandler({
    onActive: event => {
      animationKey.value = 0;
    },
  });
  const _closeEvent = useAnimatedGestureHandler({
    onActive: event => {
      animationKey.value = 1;
    },
  });

  const backgroundAnimeEvent = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(backgroundY.value, {
            duration: 500,
          }),
        },
      ],
    };
  });
  const logInViewAnimeStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(animationKey.value, {
        duration: 300,
      }),
      transform: [
        {
          translateY: withTiming(logInViewY.value, {
            duration: 300,
          }),
        },
      ],
    };
  });
  const signInViewAnimeStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(signInOpacity.value, {
        duration: 300,
      }),
      zIndex: withTiming(signInZIndex.value, {
        duration: 300,
      }),
      transform: [
        {
          translateY: withTiming(signInY.value, {
            duration: 300,
          }),
        },
      ],
    };
  });

  const goToCreateAccount = () => {
    navigation.navigate("CreateAccount");
  };

  return (
    <Container>
      <ImageBackGroundView style={backgroundAnimeEvent}>
        <Svg height={constants.height} width={constants.width + 10}>
          <ClipPath id="clip">
            <Circle r={constants.height} cx={constants.width / 2} />
          </ClipPath>
          <Image
            height={constants.height}
            width={constants.width}
            href={require("../assets/AuthView/bgImage01.jpg")}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#clip)"
          />
        </Svg>
      </ImageBackGroundView>
      <ButtonContainer>
        <LogInView style={logInViewAnimeStyle}>
          <TapGestureHandler onGestureEvent={_buttonPressEvent}>
            <SignButton bgColor={"#FBFBFB"}>
              <Text txColor={"#262626"}>SIGN IN</Text>
            </SignButton>
          </TapGestureHandler>
          <Button
            text={"SIGN IN WITH FACEBOOK"}
            bgColor={"#3897f0"}
            txColor={"#FBFBFB"}
          />
          <Button
            text={"SIGN IN WITH KAKAO"}
            bgColor={"#F6B93B"}
            txColor={"#FBFBFB"}
          />
          <Button
            text={"CREATE ACCOUNT"}
            onPress={goToCreateAccount}
            bgColor={"rgba(0, 0, 0, 0)"}
            txColor={"#F6B93B"}
            txSize={"12"}
          />
        </LogInView>
        <View style={{ ...StyleSheet.absoluteFillObject }}>
          <SignInView style={signInViewAnimeStyle}>
            <TapGestureHandler onGestureEvent={_closeEvent}>
              <CloseButton>
                <Text txColor={"#262626"}>X</Text>
              </CloseButton>
            </TapGestureHandler>
            <AuthInput placeholder={"EMAIL"} />
            <AuthInput placeholder={"PASSWORD"} />
            <Button
              text={"SIGN IN"}
              bgColor={"rgba(0, 0, 0, 0)"}
              txColor={"#262626"}
              disable={true}
            />
          </SignInView>
        </View>
      </ButtonContainer>
    </Container>
  );
};
