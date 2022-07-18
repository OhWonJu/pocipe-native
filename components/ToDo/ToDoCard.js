import { printIntrospectionSchema } from "graphql";
import React, { useContext } from "react";
import { Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import styled from "styled-components/native";

const CardContainer = styled.TouchableOpacity`
  flex: 1;
  /* margin: 10px 0px 10px 0px; */
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 20px;
  padding: 20px 15px 20px 15px;
`;

const Header = styled.View`
  flex-direction: row;
  border-bottom-width: 2px;
  border-color: ${(props) => props.theme.lightGreyColor};
  padding-bottom: 15px;
  margin-bottom: 15px;
`;
const Title = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: ${(props) => props.theme.blackColor};
`;

const Steps = styled.View`
  width: 20%;
  justify-content: center;
  align-items: flex-end;
  top: 5px;
`;
const Step = styled.Text`
  font-size: 20px;
  /* font-weight: bold; */
  color: ${(props) => props.theme.greyColor};
`;

const ImagerWrapper = styled.View`
  flex: 1;
  margin-bottom: 15px;
`;
const Image = styled.Image`
  width: 100%;
  height: 200px;
`;

const Body = styled.View``;
const Caption = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.blackColor};
  margin-bottom: 15px;
`;

const TimerWrapper = styled.View`
  align-items: flex-end;
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
    const scale = withSpring(trigger.value ? 1.06 : 1);
    return {
      flex: 1,
      marginVertical: focused ? 15 : 10,
      paddingHorizontal: focused ? 20 : 20,
      transform: [{ scale }],
    };
  });

  return (
    <Animated.View style={AnimatedStyle}>
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
            <Image source={{ uri: file }} resizeMode={"cover"} />
          </ImagerWrapper>
        )}
        <Body>
          <Caption>{caption}</Caption>
          {isTimer && (
            <TimerWrapper>
              <Text>{time}</Text>
            </TimerWrapper>
          )}
        </Body>
      </CardContainer>
    </Animated.View>
  );
};
