import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionSpecs,
} from "@react-navigation/stack";
import React from "react";

import AuthHome from "../screens/AuthHome";
import LogIn from "../screens/LogIn";
import CreateAccount from "../screens/CreateAccount";

const AuthNavigation = createStackNavigator();
// 맨 아래 스크린부터 스택형식으로 쌓인 것 (맨위가 제일 먼저 보임)
// 뷰가 쌓인다는것

const horizontalTransition = {
  gestureDirection: "horizontal",
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  //HeaderStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};
const verticallTransition = {
  gestureDirection: "vertical",
  //gestureResponseDistance: 135, // default
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  //HeaderStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
};

export default () => {
  return (
    <NavigationContainer>
      <AuthNavigation.Navigator
        screenOptions={{
          //headerShown: false,
          presentation: "card",
          gestureEnabled: true,
          headerShown: false,
          ...verticallTransition,
        }}
      >
        <AuthNavigation.Screen name="AuthHome" component={AuthHome} />
        <AuthNavigation.Screen
          name="LogIn"
          component={LogIn}
          // options={{
          //   headerShown: true,
          //   headerTitle: "로그인",
          //   headerTransparent: true,
          //   headerTintColor: "#F6B93B",
          // }}
        />
        <AuthNavigation.Screen
          name="CreateAccount"
          component={CreateAccount}
          options={{
            headerShown: true,
            headerTitle: "회원가입",
            headerTransparent: true,
            headerTintColor: "#F6B93B",
          }}
        />
      </AuthNavigation.Navigator>
    </NavigationContainer>
  );
};

// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import React from "react";
// import AuthHome from "../screens/AuthHome";
// import LogIn from "../screens/LogIn";
// import CreateAccount from "../screens/CreateAccount";
// import { NavigationContainer } from "@react-navigation/native";

// const AuthNavigation = createNativeStackNavigator();
// // 맨 아래 스크린부터 스택형식으로 쌓인 것 (맨위가 제일 먼저 보임)
// // 뷰가 쌓인다는것
// // /native-stack  속도냐 커스텀이냐~
// // /stack

// export default () => {
//   return (
//     <NavigationContainer>
//       <AuthNavigation.Navigator screenOptions={{ animation: "fade" }}>
//         <AuthNavigation.Screen name="AuthHome" component={AuthHome} />
//         <AuthNavigation.Screen name="LogIn" component={LogIn} />
//         <AuthNavigation.Screen name="CreateAccount" component={CreateAccount} />
//       </AuthNavigation.Navigator>
//     </NavigationContainer>
//   );
// };
