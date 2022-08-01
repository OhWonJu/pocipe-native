import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

const IconWrapper = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  margin: 10px 0px 10px 0px;
  /* background-color: ${(props) => props.theme.bgColor + 50}; */
  /* border-radius: 20px; */
  transform: rotate(90deg);
`;

export default ToTopBtn = ({ ref = null, to = null }) => {
  const themeContext = useContext(ThemeContext);

  const toTop = () => {
    if (ref) {
      // use current
      ref.current.scrollToOffset({ animated: true, offset: 0 });
    } else {
      to();
    }
  };

  return (
    <IconWrapper onPress={() => toTop()}>
      <MaterialIcons
        name="keyboard-arrow-left"
        size={25}
        color={themeContext.greyColor}
      />
    </IconWrapper>
  );
};
