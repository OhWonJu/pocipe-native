import React, { useCallback, useRef } from "react";
import { Animated } from "react-native";
import { useCollapsibleScene } from "react-native-collapsible-tab-view";
import ToTopBtn from "../../../components/Recipe/ToTopBtn";

import ToDoCard from "../../../components/ToDo/ToDoCard";

export default RecipeToDoScreen = ({
  navigation,
  route,
  toDos,
  toDosCount,
  headerHeight,
}) => {
  const scrollPropsAndRef = useCollapsibleScene(route.name);
  const keyExtractor = useCallback((_, index) => index.toString(), []);

  const listRef = useRef();

  const toTop = () => {
    // use current
    listRef.current.scrollToOffset({ animated: true, offset: headerHeight });
  };
  const FOOTER = () => <ToTopBtn to={toTop} />;

  const TODOCARD = ({ item }) => {
    return <ToDoCard toDosCount={toDosCount} {...item} />;
  };

  // 투두리스트 edit 뷰를 따로 둬야할듯
  return (
    <>
      <Animated.FlatList
        {...scrollPropsAndRef}
        ref={listRef}
        data={toDos}
        style={{ backgroundColor: "#FAFAFA" }}
        keyExtractor={keyExtractor}
        renderItem={TODOCARD}
        scrollEventThrottle={16}
        initialNumToRender={5}
        legacyImplementation={true}
        showsVerticalScrollIndicator={false}
        bounces={false}
        ListFooterComponent={FOOTER}
        ListFooterComponentStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </>
  );
};
