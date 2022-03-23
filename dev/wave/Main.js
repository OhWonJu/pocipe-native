import React, { useContext } from "react";
import { View, Text } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import Svg from "react-native-svg";

import constants from "../../constants";
import Wave from "./Wave";
import MaskedView from "@react-native-masked-view/masked-view";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.bgColor};
`;

const SIZE = constants.window.width - 64;

export default Main = () => {
  const themeContext = useContext(ThemeContext);

  const data = ["#8e74eb" + 40, "#7496eb" + 40, "#74d2eb" + 40];

  return (
    <Container>
      <MaskedView
        style={{
          height: SIZE,
          width: SIZE,
          backgroundColor: themeContext.lightGreyColor,
        }}
        maskElement={
          <View
            style={{
              backgroundColor: "transparent",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 120,
                color: "black",
                fontWeight: "bold",
              }}
            >
              WAVE
            </Text>
          </View>
        }
      >
        <Svg width={SIZE} height={SIZE} viewBox="0 0 1 1">
          {data.map((d, i) => (
            <Wave key={i} index={i} color={d} />
          ))}
        </Svg>
      </MaskedView>
    </Container>
  );
};
