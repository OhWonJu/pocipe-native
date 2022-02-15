// import React from "react";
// import styled from "styled-components/native";

// import HomeHeader from "../../components/Home/HomeHeader";
// import constants from "../../constants";
// import HomeTopTabNav from "../../navigators/HomeTopTabNav";

// const StatusBar = styled.View`
//   background-color: ${props => props.theme.bgColor};
//   height: ${constants.statusBarHeight}px;
//   z-index: 999;
// `;

// const Container = styled.View`
//   flex: 1;
//   background-color: ${props => props.theme.bgColor};
// `;

// export default HomeView = ({
//   headerHeight,
//   setHeaderHeight,
//   scrollY,
//   headerTranslateY,
//   tabBarTranslateY,
//   onMomentumScrollBegin,
//   onMomentumScrollEnd,
//   onScrollEndDrag,
//   tabRoutes,
//   tabIndex,
//   setTabRoutes,
//   onTabIndexChange,
//   onTabPress,
//   listArrRef,
// }) => {
//   return (
//     <>
//       <StatusBar />
//       <Container>
//         {headerHeight > 0 ? (
//           <HomeTopTabNav
//             headerHeight={headerHeight}
//             scrollY={scrollY}
//             tabBarTranslateY={tabBarTranslateY}
//             onMomentumScrollBegin={onMomentumScrollBegin}
//             onMomentumScrollEnd={onMomentumScrollEnd}
//             onScrollEndDrag={onScrollEndDrag}
//             tabRoutes={tabRoutes}
//             tabIndex={tabIndex}
//             setTabRoutes={setTabRoutes}
//             onTabIndexChange={onTabIndexChange}
//             onTabPress={onTabPress}
//             listArrRef={listArrRef}
//           />
//         ) : null}
//         <HomeHeader
//           setHeaderHeight={setHeaderHeight}
//           headerTranslateY={headerTranslateY}
//         />
//       </Container>
//     </>
//   );
// };
