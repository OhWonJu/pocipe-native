import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.bgColor};
`;

const TouchableOpacity = styled.TouchableOpacity`
  width: 90%;
  height: 60px;
  border-radius: 10px;
  padding: 10px 15px 10px 15px;
  margin: 5px 0px 5px 0px;
  justify-content: center;
  background-color: ${props => props.theme.lightGreyColor};
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 15px;
`;

export default DevMain = ({ navigation }) => {
  return (
    <Container>
      <TouchableOpacity onPress={() => navigation.navigate("Wave")}>
        <Title>🌊 WAVE</Title>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Rise")}>
        <Title>☀ RISE</Title>
      </TouchableOpacity>
    </Container>
  );
};
