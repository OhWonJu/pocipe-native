import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  position: relative;
  background-color: #fbfbfb;
  align-items: center;
  justify-content: center;
`;
const ImageBackground = styled.ImageBackground`
  width: 95%;
  height: 90%;
  align-items: center;
  justify-content: center;
`;
const BottomText = styled.Text`
  margin-top: 20px;
  margin-bottom: 50px;
`;

export default Loadings = () => {
  return (
    <Container>
      <ImageBackground
        source={require("../assets/loadingPage/loadpageEng1.png")}
        resizeMode="center"
      ></ImageBackground>
      <BottomText>🍕🥗🍣🍙🍝🍰🍮</BottomText>
    </Container>
  );
};
