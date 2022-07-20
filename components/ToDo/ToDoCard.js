import React from "react";
import { Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import styled from "styled-components/native";

import { shadows } from "../../Styles/GlobalStyles";
import Timer from "../Timer/Timer";

const CardContainer = styled.TouchableOpacity`
  flex: 1;
  /* margin: 10px 0px 10px 0px; */
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  padding: 25px 15px 25px 15px;
`;

const Header = styled.View`
  flex-direction: row;
  border-bottom-width: 1.2px;
  border-color: ${(props) => props.theme.lightGreyColor};
  padding-bottom: 15px;
  margin-bottom: 15px;
`;
const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${(props) => props.theme.blackColor};
`;

const Steps = styled.View`
  width: 20%;
  justify-content: center;
  align-items: flex-end;
  top: 9px;
`;
const Step = styled.Text`
  font-size: 13px;
  /* font-weight: bold; */
  color: ${(props) => props.theme.greyColor};
`;

const ImagerWrapper = styled.View`
  flex: 1;
  margin-bottom: 15px;
`;
const Image = styled.Image`
  width: 100%;
  height: 300px; /* 수정 필요 */
  flex: 1;
  /* height: px; */
`;

const Body = styled.View``;
const Caption = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.blackColor};
  /* margin-bottom: 5px; */
`;

const TimerWrapper = styled.View`
  margin-top: 5px;
  padding-top: 15px;
  align-items: center;
`;

export default ToDoCard = ({
  id,
  title,
  caption,
  file,
  step,
  isTimer,
  time,
  toDosCount,
  focused = false,
}) => {
  const trigger = useSharedValue(focused);
  const AnimatedStyle = useAnimatedStyle(() => {
    const scale = withSpring(trigger.value ? 1.05 : 1);
    return {
      flex: 1,
      marginVertical: focused ? 15 : 10,
      paddingHorizontal: 15,
      transform: [{ scale }],
    };
  });

  return (
    <Animated.View style={[AnimatedStyle, shadows.viewWrapper]}>
      <CardContainer activeOpacity={1}>
        <Header>
          <View
            style={{
              width: "80%",
              justifyContent: "center",
            }}
          >
            <Title>{title}</Title>
          </View>
          <Steps>
            <Step>
              {step + 1}/{toDosCount}
            </Step>
          </Steps>
        </Header>
        {file && (
          <ImagerWrapper>
            <Image source={{ uri: file }} resizeMode={"contain"} />
          </ImagerWrapper>
        )}
        <Body>
          <Caption>{caption}</Caption>
          {isTimer && (
            <TimerWrapper>
              <Timer time={time} />
            </TimerWrapper>
          )}
        </Body>
      </CardContainer>
    </Animated.View>
  );
};
