import { useQuery } from "@apollo/client";
import React from "react";

import { ME_QUREY } from "./MyPageModel";
import MyPageView from "./MyPageView";
import Loader from "../../components/Loader";

export default ({ navigation }) => {
  const { data, loading } = useQuery(ME_QUREY);
  // console.log(data);

  if (loading) {
    return <Loader />;
  }

  return <MyPageView {...data.me} />;
};
