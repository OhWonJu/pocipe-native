import React, { useContext } from "react";
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

  const viewSize = size === "normal" ? 28 : size === "small" ? 22 : 83;

  return (
    <ProfileBox viewSize={viewSize}>
      <ProfileImage source={{ uri }} viewSize={viewSize - 3} />
    </ProfileBox>
  );
};
