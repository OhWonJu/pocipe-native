import React from "react";
import { useQuery } from "@apollo/client";

import { RECIPE_LIST_QUREY } from "./RecipeListModel";
import RecipeListView from "./RecipeListView";
import Loader from "../../components/Loader";

export default ({ navigation, route }) => {
  const { data, loading } = useQuery(RECIPE_LIST_QUREY, {
    listId: route.params?.listId,
    skip: !route.params?.listId,
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <RecipeListView
      navigation={navigation}
      title={route.params?.title}
      data={data ? data.seeRecipes : []}
    />
  );
};
