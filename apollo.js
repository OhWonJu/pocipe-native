import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const isSignInVar = makeVar(false);
export const tonkenVar = makeVar(""); // 매번 storage를 불러오지 않기 위해

// 비동기라..
export const userSignIn = async token => {
  //await AsyncStorage.setItem("token", JSON.stringify(token));
  try {
    await AsyncStorage.multiSet([
      ["token", JSON.stringify(token)],
      ["signedIn", JSON.stringify("true")],
    ]);
    isSignInVar(true);
    tonkenVar(token);
  } catch (e) {
    console.log("SET ERROR: ", e);
  }
};

export const userSignOut = async () => {
  try {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.setItem("signedIn", JSON.stringify("false"));
    isSignInVar(false);
    tonkenVar("");
  } catch (e) {
    console.log("SignOutERROR: ", e);
  }
};

// 모바일 기기는 localhost가 없기 때문에
// pc의 공인 IP를 빌려오는거
// ngrok, localtunnel을 사용하는거
// 두 가지 방법 중 하나를 써야..
// lcaltunnel ->> npx lcaltunnel --port 4000
const client = new ApolloClient({
  uri: "http://3f02-218-154-176-12.ngrok.io/graphql",
  cache: new InMemoryCache(),
});

export default client;
