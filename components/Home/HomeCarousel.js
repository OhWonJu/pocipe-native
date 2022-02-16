import React, { useCallback } from "react";
import styled from "styled-components/native";

const ScrollView = styled.ScrollView`
  /* background-color: ${props => props.theme.bgColor}; */
`;
const Container = styled.View`
  height: 200px;
  justify-content: center;
  margin: 10px 0px 4px 0px;
`;
const Box = styled.View`
  width: 300px;
  height: 200px;
  margin: 0px 10px 0px 10px;
  background-color: ${props => props.color};
  border-radius: 25px;
`;

export default () => {
  const PAGES = [
    {
      num: 1,
      color: "#86E3CE",
    },
    {
      num: 2,
      color: "#D0E6A5",
    },
    {
      num: 3,
      color: "#FFDD94",
    },
    {
      num: 4,
      color: "#FA897B",
    },
    {
      num: 5,
      color: "#CCABD8",
    },
    {
      num: 6,
      color: "#F6B93B",
    },
  ];

  return (
    <Container>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        decelerationRate={"fast"}
        snapToInterval={300 + 10}
        pagingEnabled={true}
      >
        {PAGES.map(page => (
          <Box key={page.num} color={page.color} />
        ))}
      </ScrollView>
    </Container>
  );
};
