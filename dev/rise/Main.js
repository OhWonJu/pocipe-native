import React, { useContext } from "react";
import { View, Text } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import Svg, { Circle } from "react-native-svg";
import MaskedView from "@react-native-masked-view/masked-view";

import constants from "../../constants";
import Rise from "./Rise";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.bgColor};
`;

const SIZE = constants.window.width - 64;

export default Main = () => {
  const themeContext = useContext(ThemeContext);

  // const data = ["#3163e1" + 60, "#5e85e8" + 70, "#8aa7ee" + 80, "#b7c9f5" + 90];
  const data = ["#feb1bd" + 90, "#fbb38d" + 90, "#F6B93B"];
  // const data = ["#eb2f06"];

  return (
    <Container>
      <MaskedView
        maskElement={
          <View
            style={{
              backgroundColor: "black",
              width: SIZE,
              height: SIZE,
              borderRadius: SIZE / 2,
            }}
          />
        }
      >
        <Svg
          width={SIZE}
          height={SIZE}
          viewBox="0 0 1 1"
          style={{ backgroundColor: themeContext.lightGreyColor }}
        >
          {data.map((d, i) => (
            <Rise
              key={i}
              index={i}
              color={d}
              isLast={i === data.length - 1 ? true : false}
            />
          ))}
        </Svg>
      </MaskedView>
    </Container>
  );
};
