import React, { useContext, useEffect, useState } from "react";
import { View, Vibration, Animated } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import CountDown from "react-native-countdown-component";
import { ThemeContext } from "styled-components/native";
import { runOnJS } from "react-native-reanimated";

export default Timer = ({ time, isDone }) => {
  const themeContext = useContext(ThemeContext);

  const [id, setId] = useState(undefined);
  const [until, setUntil] = useState(time / 1000);
  const [running, setRunning] = useState(false);


  useEffect(() => {
    if (isDone) setRunning(false);
  }, [isDone]);

  const _longPressGesture = Gesture.LongPress()
    .minDuration(800)
    .onEnd((e, success) => {
      if (success && !isDone) {
        runOnJS(setUntil)(time / 1000);
        runOnJS(setRunning)(false);
        runOnJS(setId)(new Date().getTime().toString());
      }
    });

  const _tapGesture = Gesture.Tap().onEnd((e, success) => {
    if (success && !isDone) {
      runOnJS(setRunning)(!running);
    }
  });

  const _doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd((e, success) => {
      if (success && !isDone) {
        runOnJS(setUntil)(time / 1000);
        runOnJS(setRunning)(false);
        runOnJS(setId)(new Date().getTime().toString());
      }
    });

  const composed = Gesture.Exclusive(
    _longPressGesture, // for ios
    _doubleTapGesture, // for android
    _tapGesture
  );

  // Timer removeEventListener deprecated 이슈
  // index 찾아가서...
  //   componentDidMount() {
  //     this.appStateSubscription = AppState.addEventListener('change', this._handleAppStateChange);
  //   }
  //   componentWillUnmount() {
  //     clearInterval(this.timer);
  //     this.appStateSubscription.remove()
  //   }

  return (
    <>
      <GestureDetector gesture={composed}>
        <Animated.View
          style={{
            backgroundColor: themeContext.yellowColor,
            borderRadius: 15,
            padding: 5,
          }}
        >
          <CountDown
            id={id}
            until={until}
            running={running}
            onFinish={() => {
              Vibration.vibrate(500);
              alert("finished");
            }}
            // onPress={() => _onPress()}
            timeToShow={["M", "S"]}
            timeLabels={{ m: "", s: "" }}
            size={20}
            digitStyle={{ backgroundColor: themeContext.yellowColor }}
            digitTxtStyle={{ color: themeContext.bgColor }}
            showSeparator
            separatorStyle={{ color: themeContext.bgColor }}
          />
        </Animated.View>
      </GestureDetector>
    </>
  );
};
