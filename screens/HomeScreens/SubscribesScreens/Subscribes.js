import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import CollapsibleTabViewWrapper from "../../../components/CollapsibleTabNav/CollapsibleTabViewWrapper";

export default Subscribes = ({
  navigation,
  route,
  idx,
  tabRoutes,
  tabIndex,
  listArrRef,
  headerHeight,
  scrollY,
  onMomentumScrollBegin,
  onMomentumScrollEnd,
  onScrollEndDrag,
  onTabIndexChange,
  onTabPress,
}) => {
  const isFocused = route.name === tabRoutes[tabIndex];

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", e => {
      onTabIndexChange(idx);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", e => {
      onTabPress(idx);
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <CollapsibleTabViewWrapper
      route={route}
      listArrRef={listArrRef}
      headerHeight={headerHeight}
      scrollY={scrollY}
      isFocused={isFocused}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onMomentumScrollEnd={onMomentumScrollEnd}
      onScrollEndDrag={onScrollEndDrag}
    >
      <Text style={{ paddingVertical: 20 }}>SUBSCRIPTIONS💛</Text>
    </CollapsibleTabViewWrapper>
  );
};
