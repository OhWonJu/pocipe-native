import React from "react";
import { View, Modal, Text } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";
import styled from "styled-components/native";

const BlurGround = styled(Animated.View)`
  /* flex: 1; */
  /* min-height: 100%; */
  /* min-width: 100%; */
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgb(0, 0, 0);
`;
const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  z-index: 3;
  /* background-color: rgba(0, 0, 0, 0.25); */
`;
const ModalView = styled.View`
  background-color: ${props => props.theme.bgColor};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  align-items: center;
  height: 40%;
  width: 100%;
`;
const ModalContextBox = styled.View`
  height: 85%;
  width: 100%;
  padding: 20px;
  justify-content: space-around;
`;
const ModalContextText = styled.Text`
  padding: 5px 0px 5px 0px;
  color: ${props =>
    props.focused ? props.theme.yellowColor : props.theme.blackColor};
`;

const TouchableOpacity = styled.TouchableOpacity``;

const ModalButtonBox = styled.TouchableOpacity`
  height: 15%;
  width: 100%;
  padding: 10px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-style: solid;
  border-top-color: ${props => props.theme.lightGreyColor};
  border-top-width: 1.5px;
`;
const ModalButtonText = styled.Text`
  color: ${props => props.theme.blackColor};
`;

export default SortModal = ({
  modalVisible,
  setModalVisible,
  sortModeIndex,
  setSortModeIndex,
  sortModeText,
  confirm = () => null,
  cancel = () => null,
}) => {
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
        duration: 200,
        easing: Easing.ease,
      }),
      zIndex: BlurZIndex.value,
    };
  });

  return (
    <>
      <BlurGround style={BlurAnimeStyle} />
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <Container>
          <ModalView>
            <ModalContextBox>
              {sortModeText.map((text, index) => (
                <TouchableOpacity
                  onPress={() => {
                    setSortModeIndex(index), setModalVisible(false);
                  }}
                >
                  <ModalContextText
                    key={index}
                    focused={sortModeIndex === index ? true : false}
                  >
                    {text}
                  </ModalContextText>
                </TouchableOpacity>
              ))}
            </ModalContextBox>
            <ModalButtonBox
              onPress={() => {
                setModalVisible(false);
                cancel();
              }}
            >
              <ModalButtonText>취소</ModalButtonText>
            </ModalButtonBox>
          </ModalView>
        </Container>
      </Modal>
    </>
  );
};
