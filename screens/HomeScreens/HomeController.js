import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated } from "react-native";

import HomeView from "./HomeView";

export default HomeController = () => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [tabRoutes, setTabRoutes] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);

  const tabIndexRef = useRef(0);
  const isListGlidingRef = useRef(false);
  const listArrRef = useRef([]);
  const listOffsetRef = useRef({});
  const scrollY = useRef(new Animated.Value(0)).current;

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

  useEffect(() => {
    scrollY.addListener(({ value }) => {});

    return () => {
      scrollY.removeListener();
    };
  }, []);

  const onTabIndexChange = useCallback(id => {
    setTabIndex(id);
    tabIndexRef.current = id;
  }, []);

  const onTabPress = useCallback(idx => {
    if (!isListGlidingRef.current) {
      setTabIndex(idx);
      tabIndexRef.current = idx;
    }
  }, []);

  const syncScrollOffset = () => {
    const focusedTabKey = tabRoutes[tabIndexRef.current];

    listArrRef.current.forEach(item => {
      if (item.key !== focusedTabKey) {
        if (scrollY._value < headerHeight && scrollY._value >= 0) {
          if (item.value) {
            item.value.scrollTo({
              y: scrollY._value,
              animated: false,
            });
            // scrollView의 경우 scrollTo
            // item.value.scrollTo({
            //   y: scrollY._value,
            //   animated: false,
            // });
            listOffsetRef.current[item.key] = scrollY._value;
          }
        } else if (scrollY._value >= headerHeight) {
          if (
            listOffsetRef.current[item.key] < headerHeight ||
            listOffsetRef.current[item.key] === null
          ) {
            if (item.value) {
              item.value.scrollTo({
                y: headerHeight,
                animated: false,
              });
              // item.value.scrollTo({
              //   y: headerHeight,
              //   animated: false,
              // });
              listOffsetRef.current[item.key] = headerHeight;
            }
          }
        }
      } else {
        if (item.value) {
          listOffsetRef.current[item.key] = scrollY._value;
        }
      }
    });
  };

  const onMomentumScrollBegin = useCallback(() => {
    isListGlidingRef.current = true;
  }, []);
  const onMomentumScrollEnd = useCallback(() => {
    isListGlidingRef.current = false;
    syncScrollOffset();
  }, [headerHeight]);
  const onScrollEndDrag = useCallback(() => {
    syncScrollOffset();
  }, [headerHeight]);

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
      tabRoutes={tabRoutes}
      tabIndex={tabIndex}
      setTabRoutes={setTabRoutes}
      onTabIndexChange={onTabIndexChange}
      onTabPress={onTabPress}
      listArrRef={listArrRef}
    />
  );
};
