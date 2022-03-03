import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import Container from "../../components/Container";
import Loader from "../../components/Loader";

export default ({ data, loading, goBack, goProfile }) => {
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <TouchableOpacity onPress={goProfile}>
              <Text>Recipe Details! 💚</Text>
              <Text>{data}</Text>
            </TouchableOpacity>
          </View>
        </Container>
      )}
    </>
  );
};
