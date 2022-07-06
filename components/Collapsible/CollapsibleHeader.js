import React from "react";
import { View, Animated } from "react-native";
import constants from "../../constants";

export default CollapsibleHeader = ({
  onLayout,
  headerTranslateY,
  children,
}) => {
  return (
    <Animated.View
      onLayout={onLayout}
      pointerEvents="box-none"
      style={{
        position: "absolute",
        width: constants.width,
        transform: [{ translateY: headerTranslateY }],
      }}
    >
      {children}
    </Animated.View>
  );
};
