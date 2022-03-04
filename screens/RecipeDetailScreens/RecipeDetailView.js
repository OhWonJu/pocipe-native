import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import Container from "../../components/Container";
import Loader from "../../components/Loader";

export default ({ data, goBack, goProfile }) => {
  return (
    <>
      <View style={{ flex: 1, alignItems: "flex-start" }}>
        {data.thumbNails.map(thumbNail => (
          <View style={{ width: "100%" }}>
            <Image
              key={thumbNail}
              source={{ uri: thumbNail }}
              style={{ height: "100%" }}
              resizeMode="contain"
            />
          </View>
        ))}
      </View>
      <Container>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Recipe Details! 💚</Text>
          <Text>{data.id}</Text>
          <Text>{data.title}</Text>
          <Text>{data.caption}</Text>

          <Text>{data.servings}</Text>
          <Text>{data.difficulty}</Text>
          <Text>{data.cookingTime}</Text>
          <TouchableOpacity onPress={goProfile}>
            <Text>{data.chef.userName}</Text>
            <View
              style={{
                paddingTop: 10,
                height: 80,
                width: 80,
              }}
            >
              <Image
                source={{ uri: data.chef.profilePhoto }}
                style={{ height: 80, borderRadius: 40 }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </Container>
    </>
  );
};
