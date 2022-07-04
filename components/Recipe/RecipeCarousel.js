import React, { useCallback, useContext, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import styled, { ThemeContext } from "styled-components/native";

const CarouselWrapper = styled.View`
  height: ${(props) => props.itemHeight}px;
  overflow: hidden;
`;
const Image = styled.Image`
  width: ${(props) => props.itemWidth}px;
  height: ${(props) => props.itemHeight}px;
`;

const PaginationBox = styled.View`
  position: absolute;
  top: ${(props) => props.top}px;
  width: 100%;
  align-items: center;
  z-index: 999;
`;
const Pagination = styled.View`
  background-color: ${(props) => props.bgColor};
  padding: 3px 8px 3px 8px;
  border-radius: 30px;
`;

const PageIndex = styled.Text`
  font-weight: bold;
  font-size: 11px;
  color: ${(props) => props.fontColor};
`;

export default RecipeCarousel = ({ itemHeight, itemWidth, thumbNails }) => {
  const themeContext = useContext(ThemeContext);
  // CAROSEL THINGS //
  const [index, setIndex] = useState(0);
  const viewabilityConfig = {
    itemVisiblePercentThreshold: itemHeight,
  };
  const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
    setIndex(parseInt(changed[0].index));
  }, []);
  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  const PAGENATION_TOP = itemHeight / 1.13;

  return (
    <CarouselWrapper itemHeight={itemHeight}>
      <FlatList
        data={thumbNails}
        keyExtractor={(_, index) => index.toString()}
        snapToInterval={itemHeight}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        bounces={false}
        renderItem={({ item }) => {
          return (
            <View>
              <Image
                itemHeight={itemHeight}
                itemWidth={itemWidth}
                source={{ uri: item }}
                resizeMode="cover"
              />
            </View>
          );
        }}
        // viewabilityConfig={_viewabilityConfig}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        // onViewableItemsChanged={_onViewableItemsChanged}
      />
      {thumbNails?.length > 1 && (
        <PaginationBox top={PAGENATION_TOP}>
          <Pagination bgColor={themeContext.blackColor + 60}>
            <PageIndex fontColor={themeContext.bgColor}>
              {index + 1}/{thumbNails?.length}
            </PageIndex>
          </Pagination>
        </PaginationBox>
      )}
    </CarouselWrapper>
  );
};
