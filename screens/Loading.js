import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";

export default Loadings = () => {
  const foods = [
    "",
    "🍕",
    "🍔",
    "🍣",
    "🍙",
    "🌮",
    "🍰",
    "🥞",
    "🧀",
    "🥝",
    "🥑",
    "🍎",
    "🌭",
    "🍦",
    "🥩",
    "🥓",
    "🍤",
    "🍩",
    "🍪",
    "🍫",
    "🍇",
    "🍑",
    "🍒",
    "🍓",
    "🍅",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const changeFoods = setTimeout(() => {
      setIndex(Math.floor(Math.random() * (foods.length - 1) + 1));
    }, 1000);
    return () => clearTimeout(changeFoods); // 컴포넌트 종료 할 때 clean up - timeout 변수 작동 종료
  }); // deps가 없으면 무한 루프..

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/loadingPage/loadpageEng1.png")}
        resizeMode="center"
        style={styles.image}
      >
        <Text style={styles.food}>{foods[index]}</Text>
      </ImageBackground>
      <Text style={styles.text}>🍕🥗🍣🍙🍝🍰🍮</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFBFB",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "95%",
    left: "2.5%",
    height: "90%",
    top: "8%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: 20,
    marginBottom: 50,
  },
  food: {
    fontSize: 80,
    top: "4.2%",
    right: "2%",
  },
});
