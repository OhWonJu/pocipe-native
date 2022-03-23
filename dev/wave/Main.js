import React, { useContext } from "react";
import { View, Text } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import Svg from "react-native-svg";
import MaskedView from "@react-native-masked-view/masked-view";

import constants from "../../constants";
import { TestStar } from "../../components/Icons";
import Wave from "./Wave";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.bgColor};
`;

const SIZE = constants.window.width - 64;

export default Main = () => {
  const themeContext = useContext(ThemeContext);

  const data = ["#3163e1" + 50, "#5e85e8" + 50, "#8aa7ee" + 50, "#b7c9f5" + 50];

  return (
    // <Container>
    //   <MaskedView
    //     style={{ backgroundColor: themeContext.lightGreyColor }}
    //     maskElement={<TestStar size={SIZE} />}
    //   >
    //     <Svg width={SIZE} height={SIZE} viewBox="0 0 1 1">
    //       {data.map((d, i) => (
    //         <Wave key={i} index={i} color={d} wavy={0.7} />
    //       ))}
    //     </Svg>
    //   </MaskedView>
    // </Container>
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
            <Wave key={i} index={i} color={d} wavy={0.65} />
          ))}
        </Svg>
      </MaskedView>
    </Container>
  );
};
