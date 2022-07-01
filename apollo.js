import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const isSignInVar = makeVar(false);
export const tokenVar = makeVar(""); // 매번 storage를 불러오지 않기 위해

const TOKEN = "token";

// 비동기라..
export const userSignIn = async token => {
  //await AsyncStorage.setItem("token", JSON.stringify(token));
  try {
    await AsyncStorage.setItem(TOKEN, token);
    isSignInVar(true);
    tokenVar(token);
  } catch (e) {
    console.log("SET ERROR: ", e);
  }
};

export const userSignOut = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN);
    isSignInVar(false);
    tokenVar(null);
  } catch (e) {
    console.log("SignOutERROR: ", e);
  }
};

// 모바일 기기는 localhost가 없기 때문에
// pc의 공인 IP를 빌려오는거
// ngrok, localtunnel을 사용하는거
// 두 가지 방법 중 하나를 써야..
// lcaltunnel ->> npx localtunnel --port 4000
const TEMP_URI = "https://2f86-115-94-36-36.jp.ngrok.io";
const URI = `${TEMP_URI.trim()}/graphql`;

const httpLink = createHttpLink({
  uri: URI,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
