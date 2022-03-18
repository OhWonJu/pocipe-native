import { View, Text } from "react-native";
import CommonHeader from "../../components/CommonHeader";
import Container from "../../components/Container";

export default ({ navigation, route }) => {
  return (
    <>
      <CommonHeader navigation={navigation} type={"Setting"} title={"리스트"} />
      <Container>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Recipe List</Text>
        </View>
      </Container>
    </>
  );
};
