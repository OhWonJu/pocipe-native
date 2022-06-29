import React from "react";
import { View, Text, Modal } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.25);
`;
const ModalView = styled.View`
  background-color: ${props => props.theme.bgColor};
  border-radius: 20px;
  align-items: center;
  height: 20%;
  width: 70%;
`;
const ModalContextBox = styled.View`
  height: 70%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const ModalContextText = styled.Text`
  color: ${props => props.theme.blackColor};
`;

const ModalButtonBox = styled.View`
  height: 30%;
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
  font-weight: bold;
`;

const TouchableOpacity = styled.TouchableOpacity``;

export default AlertModal = ({
  modalVisible,
  setModalVisible,
  context,
  isSingleOption = true,
  confirm = () => null,
  cancel = () => null,
}) => {
  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Container>
          <ModalView>
            <ModalContextBox>
              <ModalContextText>{context}</ModalContextText>
            </ModalContextBox>
            <ModalButtonBox>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  confirm();
                }}
              >
                <ModalButtonText>확인</ModalButtonText>
              </TouchableOpacity>
              {!isSingleOption && (
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    cancel();
                  }}
                >
                  <ModalButtonText>취소</ModalButtonText>
                </TouchableOpacity>
              )}
            </ModalButtonBox>
          </ModalView>
        </Container>
      </Modal>
    </>
  );
};
