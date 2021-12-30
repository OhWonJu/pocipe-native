// 기본 상수 값 component

import { Dimensions } from "react-native";

// 스크린의 사이즈를 가져오는?
const { width, height } = Dimensions.get("screen");
const window = Dimensions.get("window");

export default { width, height, window };
