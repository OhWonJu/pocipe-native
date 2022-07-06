import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import { ME_QUREY } from "./MyPageModel";
import MyPageView from "./MyPageView";
import Loader from "../../components/Loader";

export default ({ navigation }) => {
  const { data, loading } = useQuery(ME_QUREY);

  const [headerHeight, setHeaderHeight] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);
  const [sortModeIndex, setSortModeIndex] = useState(0); // recent || createFirst || editFirst || popularity ||

  if (loading) {
    return <Loader />;
  }

  return (
    <MyPageView
      headerHeight={headerHeight}
      setHeaderHeight={setHeaderHeight}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      sortModeIndex={sortModeIndex}
      setSortModeIndex={setSortModeIndex}
      {...data.me}
    />
  );
};
