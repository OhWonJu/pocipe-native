import { useQuery } from "@apollo/client";
import React, { useState } from "react";

import { RECIPE_CARD_QUREY } from "./TestModel";
import TestView from "./TestView";

export default TestController = ({ navigation, route }) => {
  const { data, loading } = useQuery(RECIPE_CARD_QUREY);
  // console.log(data);

  return (
    <TestView
      navigation={navigation}
      route={route}
      data={data}
      loading={loading}
    />
  );
};
