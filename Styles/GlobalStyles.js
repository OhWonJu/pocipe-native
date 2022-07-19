import { StyleSheet, Platform } from "react-native";

import constants from "../constants";

export const globalStyles = StyleSheet.create({
  screenWrappper: {
    flex: 1,
    backgroundColor: "#FBFBFB",
    ...Platform.select({
      android: {},
      ios: {},
    }),
  },
});

export const shadows = StyleSheet.create({
  photoWrapper: {
    borderRadius: 100,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          // width: 3,
          height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 9,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  viewWrapper: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowOpacity: 0.08,
        shadowRadius: 10,
      },
      android: {
        borderRadius: 20,
        // elevation: 6,
      },
    }),
  },
});
