import React, { useCallback, useRef, useState } from "react";
import { Animated } from "react-native";

import HomeView from "./HomeView";

export default HomeController = () => {
  const [headerHeight, setHeaderHeight] = useState(0);

  const scrollY = useRef(new Animated.Value(0)).current;
  const isListGlidingRef = useRef(false);

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
    extrapolate: "clamp",
  });

  const tabBarTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [headerHeight, 0],
    extrapolateRight: "clamp",
  });

  const onMomentumScrollBegin = useCallback(() => {
    isListGlidingRef.current = true;
  }, []);
  const onMomentumScrollEnd = useCallback(() => {
    isListGlidingRef.current = false;
  }, [headerHeight]);
  const onScrollEndDrag = useCallback(() => {}, [headerHeight]);

  return (
    <HomeView
      headerHeight={headerHeight}
      setHeaderHeight={setHeaderHeight}
      scrollY={scrollY}
      headerTranslateY={headerTranslateY}
      tabBarTranslateY={tabBarTranslateY}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onMomentumScrollEnd={onMomentumScrollEnd}
      onScrollEndDrag={onScrollEndDrag}
    />
  );
};
