import React from "react";
import { createMaterialCollapsibleTopTabNavigator } from "react-native-collapsible-tab-view";
import HomeHeader from "../components/Home/HomeHeader";
import Recipes from "../screens/HomeScreens/RecipesScreens/Recipes";
import ForYou from "../screens/HomeScreens/ForYouScreens/ForYou";
import Subscribes from "../screens/HomeScreens/SubscribesScreens/Subscribes";
import Test from "../screens/HomeScreens/TestScreens/index";

import TabBar from "../components/TabBar";

const NEWRECIPES = ({ navigation, route }) => (
  <Recipes navigation={navigation} route={route} />
);
const FORYOU = ({ navigation, route }) => (
  <ForYou navigation={navigation} route={route} />
);
const SUBSCRIBES = ({ navigation, route }) => (
  <Subscribes navigation={navigation} route={route} />
);
const TEST = ({ navigation, route }) => (
  <Test navigation={navigation} route={route} />
);

const Tabs = createMaterialCollapsibleTopTabNavigator();

export default ({ headerHeight, setHeaderHeight, goToNotification }) => {
  const HOMEHEADER = () => {
    return (
      <HomeHeader
        setHeaderHeight={setHeaderHeight}
        goToNotification={goToNotification}
      />
    );
  };

  const tabContext = [
    { key: 1, title: "레시피", name: "NewRecipes", ref: React.createRef() },
    { key: 2, title: "For You", name: "ForYou", ref: React.createRef() },
    { key: 3, title: "테스트", name: "test", ref: React.createRef() },
    { key: 4, title: "구독", name: "Subscribes", ref: React.createRef() },
  ];

  return (
    <Tabs.Navigator
      collapsibleOptions={{
        headerHeight: headerHeight,
        renderHeader: HOMEHEADER,
        disableSnap: true,
      }}
      tabBar={({ navigation, state }) => (
        <TabBar
          data={tabContext}
          navigation={navigation}
          state={state}
          tabContainerStyle={{
            justifyContent: "flex-start",
          }}
        />
      )}
      backBehavior="none"
    >
      <Tabs.Screen name="NewRecipes" component={NEWRECIPES} />
      <Tabs.Screen name="ForYou" component={FORYOU} />
      <Tabs.Screen name="test" component={TEST} />
      <Tabs.Screen name="Subscribes" component={SUBSCRIBES} />
    </Tabs.Navigator>
  );
};
