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

import ModalFade from "./ModalFade";

const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  z-index: 3;
`;
const ModalView = styled.View`
  background-color: ${(props) => props.theme.bgColor};
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
  color: ${(props) =>
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
  border-top-color: ${(props) => props.theme.lightGreyColor};
  border-top-width: 1.5px;
`;
const ModalButtonText = styled.Text`
  color: ${(props) => props.theme.blackColor};
`;

export default SortModal = ({
  modalVisible,
  setModalVisible,
  sortModeIndex,
  setSortModeIndex,
  confirm = () => null,
  cancel = () => null,
}) => {
  const sortModeText = ["최근", "작성순", "편집순", "인기순"];

  return (
    <>
      <ModalFade modalVisible={modalVisible} />
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
                  key={index}
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
