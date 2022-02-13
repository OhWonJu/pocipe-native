import React from "react";
import { Text } from "react-native";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

import CollapsibleTabViewWrapper from "../../../components/CollapsibleTabNav/CollapsibleTabViewWrapper";

export default ForYou = ({ headerHeight, scrollY }) => {
  return (
    <CollapsibleTabViewWrapper headerHeight={headerHeight} scrollY={scrollY}>
      {new Array(20).fill(null).map((_, index) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Text key={index} style={{ paddingVertical: 20, color: "blue" }}>
            {index}
          </Text>
        );
      })}
    </CollapsibleTabViewWrapper>
  );
};
