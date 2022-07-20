import React, { useContext, useEffect, useState } from "react";
import styled, { ThemeContext } from "styled-components/native";

const ProfileBox = styled.View`
  justify-content: center;
  align-items: center;
  height: ${(props) => props.viewSize}px;
  width: ${(props) => props.viewSize}px;
`;
const ProfileImage = styled.Image`
  height: ${(props) => props.viewSize}px;
  width: ${(props) => props.viewSize}px;
  border-radius: ${(props) => Math.round(props.viewSize / 2)}px;
`;

// size -> small || normal || large
export default ({ size = "normal", uri }) => {
  // const themeContext = useContext(ThemeContext);

  const viewSize = {
    small: 22,
    normal: 28,
    middle: 68,
    large: 83,
    profile: 113,
  };

  return (
    <ProfileBox viewSize={viewSize[size]}>
      <ProfileImage source={{ uri }} viewSize={viewSize[size] - 3} />
    </ProfileBox>
  );
};
