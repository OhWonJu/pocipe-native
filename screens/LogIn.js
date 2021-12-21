import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

export default LogIn = ({ navigation }) => {
  return (
    <View>
      <Text>LogIn</Text>
      <TouchableOpacity onPress={() => navigation.navigate(CreateAccount)}>
        <View>
          <Text>Create Account</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
