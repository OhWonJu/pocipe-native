import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { BlurView } from "expo-blur";

import Container from "../../components/Container";
import constants from "../../constants";
import ProfilePhoto from "../../components/ProfilePhoto";

export default ({ data, goBack, goProfile }) => {
  constants;
  return (
    <ScrollView>
      <View
        style={{
          minHeight: constants.height,
        }}
      >
        {data.thumbNails.map(thumbNail => (
          <View
            key={thumbNail}
            style={{ width: "100%", height: constants.height }}
          >
            <Image
              style={[StyleSheet.absoluteFill, styles.image]}
              source={{ uri: thumbNail }}
            />
            <BlurView intensity={100} tint="light" style={styles.blurContainer}>
              <Image
                source={{ uri: thumbNail }}
                style={{ height: constants.width / 1.1, borderRadius: 2 }}
                resizeMode="contain"
              />
            </BlurView>
          </View>
        ))}
      </View>
      <Container>
        <View
          style={{
            flex: 1,
            minHeight: constants.height,
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
            <ProfilePhoto size="large" uri={data.chef.profilePhoto} />
          </TouchableOpacity>
        </View>
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  blurContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "600",
  },
});
