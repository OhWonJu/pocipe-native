import { StyleSheet, Platform } from "react-native";

export const shadows = StyleSheet.create({
  photoWrapper: {
    borderRadius: 100,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 3,
          height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
