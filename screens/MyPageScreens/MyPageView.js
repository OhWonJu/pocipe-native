import React, { useCallback, useContext, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled, { ThemeContext } from "styled-components/native";

import CommonHeader from "../../components/CommonHeader";
import ProfileInfo from "../../components/Profile/ProfileInfo";
import RecipeListHeader from "../../components/List/RecipeListHeader";
import CollapsibleHeader from "../../components/Collapsible/CollapsibleHeader";
import CollapsibleRecipeList from "../../components/Collapsible/CollapsibleRecipeList";
import SortModal from "../../components/Modals/SortModal";

const LIST_HEADER_HEIGHT = 85;

const ListHaeder = styled(Animated.View)`
  background-color: ${(props) => props.theme.bgColor};
  height: ${LIST_HEADER_HEIGHT}px;
  padding: 10px 20px 0px 20px;
  z-index: 800;
`;

const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.yellowColor};
`;

export default MyPageView = ({
  headerHeight,
  setHeaderHeight,
  modalVisible,
  setModalVisible,
  sortModeIndex,
  setSortModeIndex,
  userName,
  profilePhoto,
  bio,
  totalStar,
  subscribersCount,
  subscribingsCount,
  recipes,
}) => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();

  const recipeIds = recipes.map((recipe) => recipe.id);

  const scrollY = useRef(new Animated.Value(0)).current;
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
    extrapolate: "clamp",
  });
  const ListHeaderTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [headerHeight, 0],
    extrapolateRight: "clamp",
  });

  const headerOnLayout = useCallback((event) => {
    const { height } = event.nativeEvent.layout;
    setHeaderHeight(height);
  }, []);

  // 스크롤 + 터치 문제 리액트네이티브제스쳐의 buttons로 해결할 수 있다?

  return (
    <>
      <View style={{ zIndex: 900 }}>
        <CommonHeader
          navigation={navigation}
          type={"MyPage"}
          title={"마이페이지"}
        />
      </View>
      <SafeAreaView>
        {headerHeight > 0 && (
          <>
            <ListHaeder
              pointerEvents="box-none"
              style={{ transform: [{ translateY: ListHeaderTranslateY }] }}
            >
              <View pointerEvents="none">
                <SectionTitle>내 레시피</SectionTitle>
              </View>
              <RecipeListHeader
                recipeCount={recipeIds.length}
                isProfile={true}
                setModalVisible={setModalVisible}
                sortModeIndex={sortModeIndex}
              />
            </ListHaeder>
            <CollapsibleRecipeList
              navigation={navigation}
              data={recipes}
              headerHeight={headerHeight}
              scrollY={scrollY}
              onEndReachedThreshold={0.1}
              onEndReached={null}
              refreshing={null}
              onRefresh={null}
              contentContainerStyle={{
                paddingBottom: 300,
                backgroundColor: themeContext.bgColor,
              }}
              isProfile={true}
            />
          </>
        )}
        <CollapsibleHeader
          onLayout={headerOnLayout}
          headerTranslateY={headerTranslateY}
        >
          <ProfileInfo
            userName={userName}
            profilePhoto={profilePhoto}
            bio={bio}
            totalStar={totalStar}
            subscribersCount={subscribersCount}
            subscribingsCount={subscribingsCount}
            recipes={recipes}
          />
        </CollapsibleHeader>
      </SafeAreaView>
      {
        <SortModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          sortModeIndex={sortModeIndex}
          setSortModeIndex={setSortModeIndex}
        />
      }
    </>
  );
};
