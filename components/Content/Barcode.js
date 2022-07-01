import React from "react";
import { View } from "react-native";
import styled, { ThemeContext } from "styled-components/native";

const RANGE = 14;
var REGEX = /[^0-9]/g;
const Code = styled.View`
  flex: 1;
  background-color: ${(props) =>
    props.index === 0 || props.index === RANGE
      ? props.theme.blackColor
      : props.theme.bgColor};
  border-right-color: ${(props) => props.theme.blackColor};
  border-right-width: ${(props) =>
    props.index === 0 || props.index === RANGE ? 0 : props.weight}px;
`;

export default Barcode = ({ id }) => {
  let code = id.replace(REGEX, "");

  const getWeight = (code) => {
    var temp = parseInt(code);
    return temp < 6 ? temp * 2 : temp + 3;
  };

  return (
    <View style={{ flexDirection: "row", flex: 1 }}>
      {new Array(RANGE + 1).fill(null).map((_, index) => {
        const weight = getWeight(code[index]);

        return <Code key={index} index={index} weight={weight} />;
      })}
    </View>
  );
};
