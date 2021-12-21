import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

// props의 navigation.naviagte(nav name)
export default AuthHome = ({ navigation }) => {
  return (
    <View>
      <Text>🙋🏻‍♂️🙋🏻‍♂️🙋🏻‍♂️</Text>
      <TouchableOpacity onPress={() => navigation.navigate(LogIn)}>
        <View>
          <Text>Log In</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(CreateAccount)}>
        <View>
          <Text>Create Account</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
