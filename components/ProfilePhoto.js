import React, { useContext, useEffect, useState } from "react";
import styled, { ThemeContext } from "styled-components/native";

const ProfileBox = styled.View`
  justify-content: center;
  align-items: center;
  height: ${props => props.viewSize}px;
  width: ${props => props.viewSize}px;
`;
const ProfileImage = styled.Image`
  height: ${props => props.viewSize}px;
  width: ${props => props.viewSize}px;
  border-radius: ${props => Math.round(props.viewSize / 2)}px;
`;

// size -> small || normal || large
export default ({ size = "normal", uri }) => {
  const themeContext = useContext(ThemeContext);

  const [viewSize, setViewSize] = useState(22);

  useEffect(() => {
    switch (size) {
      case "small":
        setViewSize(22);
        break;
      case "normal":
        setViewSize(28);
        break;
      case "large":
        setViewSize(83);
        break;
      case "profile":
        setViewSize(113);
        break;
      default:
        setViewSize(28);
    }
  }, []);

  return (
    <ProfileBox viewSize={viewSize}>
      <ProfileImage source={{ uri }} viewSize={viewSize - 3} />
    </ProfileBox>
  );
};
