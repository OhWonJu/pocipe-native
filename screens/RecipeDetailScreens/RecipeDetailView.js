import React, { useCallback, useContext, useMemo, useRef } from "react";
import { View } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import Container from "../../components/Container";
import constants from "../../constants";
import RecipeCarousel from "../../components/Recipe/RecipeCarousel";
import RecipeInfo from "../../components/Recipe/RecipeInfo";

const ITEM_WIDTH = constants.width;
const ITEM_HEIGHT = constants.width;

const Header = styled.View`
  flex-direction: row;
  position: absolute;
  height: 40px;
  padding-top: 5px;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;
const Left = styled.View`
  flex: 1;
  justify-content: center;
  /* align-items: center; */
`;
const Right = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const IconWrapper = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  justify-content: center;
  align-items: center;
  transform: rotate(-90deg);
`;

export default RecipeDetailView = ({
  goBack,
  goProfile,
  id,
  title,
  caption,
  thumbNails,
  chef,
  servings,
  difficulty,
  cookingTime,
  kategories,
  ingredients,
  totalStar,
  starAverage,
  commentsCount,
  givnStar,
  isMine,
}) => {
  const themeContext = useContext(ThemeContext);
  // BOTTOM SHEET THINGS //
  // ref
  const bottomSheetRef = useRef(null);
  // variables
  const snapPoints = useMemo(
    () => [constants.height - ITEM_HEIGHT - 65, "100%"],
    []
  );
  // callbacks
  const handleSheetChanges = useCallback((index) => {
    // console.log("handleSheetChanges", index);
  }, []);

  // collapsible Tab's header //
  const RECIPE_INFO_HEADER = () => {
    return (
      <Container>
        <RecipeInfo
          id={id}
          title={title}
          caption={caption}
          chef={chef}
          servings={servings}
          difficulty={difficulty}
          cookingTime={cookingTime}
          kategories={kategories}
          ingredients={ingredients}
          totalStar={totalStar}
          starAverage={starAverage}
          commentsCount={commentsCount}
          givnStar={givnStar}
          isMine={isMine}
          goProfile={goProfile}
        />
      </Container>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* 헤더 */}
      <Header pointerEvents="box-none">
        <Left>
          <IconWrapper onPress={goBack}>
            <MaterialIcons
              name="keyboard-arrow-left"
              size={38}
              color={themeContext.blackColor}
            />
          </IconWrapper>
        </Left>
        <Right></Right>
      </Header>
      <RecipeCarousel
        itemHeight={ITEM_HEIGHT}
        itemWidth={ITEM_WIDTH}
        thumbNails={thumbNails}
      />
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        handleStyle={{
          backgroundColor: themeContext.bgColor,
          paddingVertical: 20,
          borderRadius: 30,
        }}
        // onChange={handleSheetChanges}
      >
        <BottomSheetView
          style={{
            flex: 1,
            spaddingTop: 10,
            backgroundColor: themeContext.bgColor,
          }}
        >
          <RECIPE_INFO_HEADER />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};
