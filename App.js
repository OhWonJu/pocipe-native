import React, { useEffect, useState, useCallback } from "react";
//import AppLoading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import Loading from "./screens/Loading";
import AuthNavigation from "./navigators/AuthNavigation";

export default function App() {
  const [loading, setLoading] = useState(true);

  const onFinish = () =>
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  // startAsync는 항상 promise를 반환해야함.
  const preload = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map(font => Font.loadAsync(font)); // font package의 loadAsync func로 비동기처리 다른 방법들도 있음 DOCS참고
    // preloading images
    const imagesToLoad = [
      require("./assets/loadingPage/Pocipe.png"),
      //require("./assets/loadingPage/loadpageEng2.png"),
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
        setLoading(true);
        onFinish();
      }
    };
    prepare();
  }, []);

  // SplashScreen.preventAutoHideAsync() 자체를 안써서
  // onLayout={onLayoutRootView} 안써도 되는듯..?
  const onLayoutRootView = useCallback(async () => {
    if (!loading) {
      await SplashScreen.hideAsync();
    }
  }, [loading]);

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
    return <Loading />;
  }

  return <AuthNavigation />;
}
