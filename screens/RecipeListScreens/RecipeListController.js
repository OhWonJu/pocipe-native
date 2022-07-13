import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { RECIPE_LIST_QUREY } from "./RecipeListModel";
import RecipeListView from "./RecipeListView";

export default ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [sortModeIndex, setSortModeIndex] = useState(0); // recent || createFirst || editFirst || popularity ||

  const { data, loading } = useQuery(RECIPE_LIST_QUREY, {
    listId: route.params?.listId,
    skip: !route.params?.listId,
  });

  return (
    <RecipeListView
      navigation={navigation}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      sortModeIndex={sortModeIndex}
      setSortModeIndex={setSortModeIndex}
      title={route.params?.title}
      data={data?.seeRecipes}
      loading={loading}
    />
  );
};

// 모달 투명하게 하는거..
// http://daplus.net/react-native-react-native%EC%97%90%EC%84%9C-%ED%88%AC%EB%AA%85%ED%95%9C-%EB%B0%B0%EA%B2%BD%EC%83%89%EC%9D%84-%EC%84%A4%EC%A0%95%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95/
