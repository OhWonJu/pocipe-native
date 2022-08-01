import React, { useEffect, useState } from "react";
//import AppLoading from "expo-app-loading";
import { Appearance, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
//import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-reanimated";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Provider as StoreProvider,
} from "react-redux";

import { lightTheme, darkTheme } from "./Styles/Theme";
import SplashView from "./screens/SplashView";
import SignOutNav from "./navigators/SignOutNav";
import SignInNav from "./navigators/SignInNav";
import client, { isSignInVar, tokenVar } from "./apollo";
import Store from "./Store/Store";

function App() {
  const [loading, setLoading] = useState(true);

  const isSignIn = useReactiveVar(isSignInVar);
  // console.log(isSignIn);

  const onFinish = () =>
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  const preloadAssets = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font)); // font package의 loadAsync func로 비동기처리 다른 방법들도 있음 DOCS참고
    // preloading images
    const imagesToLoad = [
      require("./assets/loadingPage/Logo-black.png"),
      require("./assets/loadingPage/Logo-yellow.png"),
      require("./assets/loadingPage/Logo-white.png"),
      require("./assets/AuthView/bgImage01.jpg"),
    ];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    // preloading caches
    return Promise.all([...fontPromises, ...imagePromises]); // 인자로 주어진 promise list가 끝날 때 까지 가디려줌, 두 배열을 언팩해서 하나의 큰 배열로
  };
  // startAsync는 항상 promise를 반환해야함.
  const preload = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        // ReactiveVar update
        // 로그인이 되면 토큰값을 저장을 해놔서..나중에 다시 getItem을 안해도 되게끔..
        isSignInVar(true);
        tokenVar(token);
      }
    } catch (e) {
      console.log("getTOKEN ERROR: ", e);
    }
    return preloadAssets();
  };

  // apploading 컴포넌트를 쓰는것과 비슷하지만 나만의 splash screen을 내보내고 싶을 때
  useEffect(() => {
    const prepare = async () => {
      try {
        //await SplashScreen.preventAutoHideAsync();
        preload();
      } catch (e) {
        console.warn(e);
      } finally {
        onFinish();
      }
    };
    prepare();
  }, []);

  const colorScheme = Appearance.getColorScheme();
  let Theme = colorScheme === "light" ? lightTheme : darkTheme;

  if (loading) {
    return <SplashView />;
  }

  return (
    <>
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <ThemeProvider theme={Theme}>
            <NavigationContainer>
              {isSignIn ? <SignInNav /> : <SignOutNav />}
            </NavigationContainer>
          </ThemeProvider>
        </SafeAreaProvider>
      </ApolloProvider>
    </>
  );
}

export default function AppWrapper() {
  return (
    <StoreProvider store={Store}>
      <App />
    </StoreProvider>
  );
}
