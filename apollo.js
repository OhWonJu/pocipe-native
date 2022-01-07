import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const isSignInVar = makeVar(false);

// 모바일 기기는 localhost가 없기 때문에
// pc의 공인 IP를 빌려오는거
// ngrok, localtunnel을 사용하는거
// 두 가지 방법 중 하나를 써야..
// lcaltunnel ->> npx lcaltunnel --port 4000
const client = new ApolloClient({
  uri: "http://c7a3-221-167-62-185.ngrok.io/graphql",
  cache: new InMemoryCache(),
});

export default client;
