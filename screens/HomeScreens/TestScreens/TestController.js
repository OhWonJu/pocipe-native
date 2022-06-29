import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import { RECIPE_CARD_QUREY } from "./TestModel";
import TestView from "./TestView";

export default TestController = ({ navigation, route }) => {
  const { data, loading } = useQuery(RECIPE_CARD_QUREY);

  return (
    <TestView
      navigation={navigation}
      route={route}
      data={data}
      loading={loading}
    />
  );
};
