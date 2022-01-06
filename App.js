import React, { useEffect, useState } from "react";
//import AppLoading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
//import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import { ThemeProvider } from "styled-components/native";
import { ApolloProvider, useReactiveVar } from "@apollo/client";

import { lightTheme, darkTheme } from "./Styles/Theme";
import SplashView from "./screens/SplashView";
import SignOutNav from "./navigators/SignOutNav";
import SignInNav from "./navigators/SignInNav";
import client, { isSignInVar } from "./apollo";

export default function App() {
  const [loading, setLoading] = useState(true);
  const isSignIn = useReactiveVar(isSignInVar);

  const onFinish = () =>
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  // startAsync는 항상 promise를 반환해야함.
  const preload = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map(font => Font.loadAsync(font)); // font package의 loadAsync func로 비동기처리 다른 방법들도 있음 DOCS참고
    // preloading images
    const imagesToLoad = [
      require("./assets/loadingPage/Logo-black.png"),
      require("./assets/loadingPage/Logo-yellow.png"),
      require("./assets/AuthView/bgImage01.jpg"),
    ];
    const imagePromises = imagesToLoad.map(image => Asset.loadAsync(image));
    // preloading caches
    return Promise.all([...fontPromises, ...imagePromises]); // 인자로 주어진 promise list가 끝날 때 까지 가디려줌, 두 배열을 언팩해서 하나의 큰 배열로
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

  let colorScheme = useColorScheme();
  let Theme = colorScheme === "light" ? lightTheme : darkTheme;

  // SplashScreen.preventAutoHideAsync() 자체를 안써서
  // onLayout={onLayoutRootView} 안써도 되는듯..?
  // const onLayoutRootView = useCallback(async () => {
  //   if (!loading) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [loading]);
  //
  // if (loading) {
  //   // 로딩, 에러, 로딩완료 처리
  //   return (
  //     <>
  //       <AppLoading
  //         startAsync={preload}
  //         onError={console.warn}
  //         onFinish={onFinish}
  //       />
  //       <Loading />
  //     </>
  //   );
  // }

  if (loading) {
    return <SplashView />;
  }

  return (
    <>
      <ApolloProvider client={client}>
        <AppearanceProvider>
          <ThemeProvider theme={Theme}>
            <NavigationContainer>
              {isSignIn ? <SignInNav /> : <SignOutNav />}
            </NavigationContainer>
          </ThemeProvider>
        </AppearanceProvider>
      </ApolloProvider>
    </>
  );
}
