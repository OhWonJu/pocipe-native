import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import styled from "styled-components/native";

import { shadows } from "../../Styles/GlobalStyles";
import Timer from "../Timer/Timer";

const CardContainer = styled.View`
  flex: 1;
  /* margin: 10px 0px 10px 0px; */
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  padding: 25px 15px 25px 15px;
`;
const DoneView = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  /* left: 15px; */
  background-color: ${(props) => props.theme.greyColor + 10};
  /* border-radius: 15px; */
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
  color: ${(props) =>
    props.isDone ? props.theme.greyColor : props.theme.blackColor};
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
  color: ${(props) =>
    props.isDone ? props.theme.greyColor : props.theme.blackColor};
  text-decoration: ${(props) => (props.isDone ? "line-through" : "none")};
  text-decoration-color: ${(props) => props.theme.greyColor};
`;

const TimerWrapper = styled.View`
  margin-top: 20px;
  /* padding-top: 15px; */
  align-items: center;
`;

// 최적화 필요로 하는 props가 변하지 않는다면, 변하지 않았다면 굳이 자식 컴포넌트도 re-rendering 될 필요가 있을까...?
// pure component 관련 숙지하자.
const IMAGE = React.memo(({ file }) => (
  <Image source={{ uri: file }} resizeMode={"contain"} />
));

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
  const [isDone, setIsDone] = useState(false);

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

  const TOUCHABLE = ({ style, children }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setIsDone(!isDone)}
        style={style}
      >
        {children}
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Animated.View style={[AnimatedStyle, shadows.viewWrapper]}>
        <CardContainer isDone={isDone}>
          <TOUCHABLE>
            <Header>
              <View
                style={{
                  width: "80%",
                  justifyContent: "center",
                }}
              >
                <Title isDone={isDone}>{title}</Title>
              </View>
              <Steps>
                <Step>
                  {step + 1}/{toDosCount}
                </Step>
              </Steps>
            </Header>
          </TOUCHABLE>
          {file && (
            <ImagerWrapper>
              <IMAGE file={file} />
              <TOUCHABLE
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                }}
              />
            </ImagerWrapper>
          )}
          <Body>
            <TOUCHABLE>
              <Caption isDone={isDone}>{caption}</Caption>
            </TOUCHABLE>
            {isTimer && (
              <TimerWrapper>
                <Timer time={time} isDone={isDone} />
              </TimerWrapper>
            )}
          </Body>
        </CardContainer>
        {isDone && (
          <DoneView
            pointerEvents="none"
            style={{ left: 15, borderRadius: 15 }}
          />
        )}
      </Animated.View>
    </>
  );
};
