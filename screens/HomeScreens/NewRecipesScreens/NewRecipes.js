import React from "react";
import { Text } from "react-native";
import CollapsibleTabViewWrapper from "../../../components/CollapsibleTabNav/CollapsibleTabViewWrapper";

export default NewRecipes = ({
  headerHeight,
  scrollY,
  onMomentumScrollBegin,
  onMomentumScrollEnd,
  onScrollEndDrag,
}) => {
  return (
    <CollapsibleTabViewWrapper
      headerHeight={headerHeight}
      scrollY={scrollY}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onMomentumScrollEnd={onMomentumScrollEnd}
      onScrollEndDrag={onScrollEndDrag}
    >
      {new Array(20).fill(null).map((_, index) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Text key={index} style={{ paddingVertical: 20, color: "red" }}>
            {index}
          </Text>
        );
      })}
    </CollapsibleTabViewWrapper>
  );
};
