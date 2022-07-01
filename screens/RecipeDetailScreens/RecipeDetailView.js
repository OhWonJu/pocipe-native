import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

import Container from "../../components/Container";
import constants from "../../constants";
import ProfilePhoto from "../../components/ProfilePhoto";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import Barcode from "../../components/Content/Barcode";

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

const CaroselWrapper = styled.View`
  height: ${ITEM_HEIGHT}px;
  overflow: hidden;
`;
const Image = styled.Image`
  width: ${ITEM_WIDTH}px;
  height: ${ITEM_HEIGHT}px;
`;

const PaginationBox = styled.View`
  position: absolute;
  top: ${ITEM_HEIGHT / 1.13}px;
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

const IconWrapper = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  justify-content: center;
  align-items: center;
  transform: rotate(-90deg);
`;

const InfoWrapper = styled.View`
  flex: 1;
`;
const InfoBox = styled.View`
  justify-content: center;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom-width: 2px;
  border-color: ${(props) => props.blackColor};
`;
const Title = styled.Text`
  color: ${(props) => props.theme.blackColor};
  font-weight: bold;
  font-size: 35px;
`;
const Caption = styled.Text`
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 14px;
`;

const RowBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-top: 4px;
  padding-bottom: 4px;
`;
const RowText = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.darkGreyColor};
`;

const KategorieRow = styled.View`
  flex: 1;
  /* flex-direction: row; */
`;
const KategorieTitle = styled.Text`
  flex: 1;
  text-align: center;
  color: ${(props) => props.theme.blackColor};
  font-size: 15px;
`;
const KateInnerBox = styled.View`
  flex: 1;
  padding-top: 7px;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;
const KategorieTextBtn = styled.TouchableOpacity`
  margin: 2px;
  padding: 5px;
  background-color: ${(props) => props.theme.yellowColor + 50};
  border-radius: 10px;
`;
const KategorieText = styled.Text``;

const TotalStar = styled.Text`
  color: ${(props) => props.theme.blackColor};
  font-weight: bold;
  font-size: 28px;
`;

const BarCodeWrapper = styled.View`
  height: 90px;
  padding-top: 5px;
  /* padding-bottom: 5px; */
`;
const BarcodeText = styled.Text`
  color: ${(props) => props.theme.blackColor};
  font-size: 13px;
  /* font-weight: bold; */
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
  // CAROSEL THINGS //
  const [index, setIndex] = useState(0);
  const viewabilityConfig = {
    itemVisiblePercentThreshold: ITEM_HEIGHT,
  };
  const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
    setIndex(parseInt(changed[0].index));
  }, []);
  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);
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
      <CaroselWrapper>
        <FlatList
          data={thumbNails}
          keyExtractor={(_, index) => index.toString()}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
          bounces={false}
          renderItem={({ item }) => {
            return (
              <View>
                <Image source={{ uri: item }} resizeMode="cover" />
              </View>
            );
          }}
          // viewabilityConfig={_viewabilityConfig}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          // onViewableItemsChanged={_onViewableItemsChanged}
        />
        {thumbNails?.length > 1 && (
          <PaginationBox>
            <Pagination bgColor={themeContext.blackColor + 60}>
              <PageIndex fontColor={themeContext.bgColor}>
                {index + 1}/{thumbNails?.length}
              </PageIndex>
            </Pagination>
          </PaginationBox>
        )}
      </CaroselWrapper>
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
        <BottomSheetScrollView
          style={{ paddingTop: 10, backgroundColor: themeContext.bgColor }}
        >
          <Container>
            <InfoWrapper>
              <InfoBox style={{ paddingTop: 0 }}>
                <Title>{title}</Title>
                <View style={{ paddingTop: 10 }}>
                  <Caption>{caption}</Caption>
                </View>
              </InfoBox>
              <InfoBox>
                <RowBox>
                  <RowText>serving</RowText>
                  <RowText>{servings}</RowText>
                </RowBox>
                <RowBox>
                  <RowText>difficulty</RowText>
                  <RowText>{difficulty}</RowText>
                </RowBox>
                <RowBox>
                  <RowText>cookingTime</RowText>
                  <RowText>{`${Math.floor(
                    cookingTime / (1000 * 60)
                  )} min`}</RowText>
                </RowBox>
                <RowBox style={{ paddingTop: 15 }}>
                  <KategorieRow style={{ addingRight: 8 }}>
                    <KategorieTitle>Kategories</KategorieTitle>
                    <KateInnerBox>
                      {kategories.map((obj) => (
                        <KategorieTextBtn>
                          <KategorieText key={obj.kategorie}>
                            {obj.kategorie}
                          </KategorieText>
                        </KategorieTextBtn>
                      ))}
                    </KateInnerBox>
                  </KategorieRow>
                  <KategorieRow style={{ addingLeft: 8 }}>
                    <KategorieTitle>ingredients</KategorieTitle>
                    <KateInnerBox>
                      {ingredients.map((obj) => (
                        <KategorieTextBtn>
                          <KategorieText key={obj.ingredient}>
                            {obj.ingredient}
                          </KategorieText>
                        </KategorieTextBtn>
                      ))}
                    </KateInnerBox>
                  </KategorieRow>
                </RowBox>
              </InfoBox>
              <InfoBox style={{ borderBottomWidth: 0 }}>
                <RowBox>
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      justifyContent: "space-between",
                      paddingRight: 8,
                    }}
                  >
                    <RowText>StarAverage</RowText>
                    <RowText>{starAverage}</RowText>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      justifyContent: "space-between",
                      paddingLeft: 8,
                    }}
                  >
                    <RowText>Comment</RowText>
                    <RowText>{commentsCount}</RowText>
                  </View>
                </RowBox>
                <RowBox>
                  <TotalStar>TOTAL STAR</TotalStar>
                  <TotalStar>{totalStar}</TotalStar>
                </RowBox>
              </InfoBox>
              <BarCodeWrapper>
                <Barcode id={id} />
              </BarCodeWrapper>
              <View
                style={{
                  flexDirection: "row",
                  paddingVertical: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View style={{ paddingRight: 3 }}>
                  <BarcodeText>Recipe by {chef.userName}</BarcodeText>
                </View>
                <TouchableOpacity
                  onPress={goProfile}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <ProfilePhoto size="normal" uri={chef.profilePhoto} />
                </TouchableOpacity>
              </View>
            </InfoWrapper>
          </Container>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};
