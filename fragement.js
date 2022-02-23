import { gql } from "@apollo/client";

// 자주 쓰는 field를 미리 써놓는겨

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    userName
    bio
    profilePhoto
    startCount
    totalStar
    subscribersCount
    subscribingsCount
  }
`;

export const TODO_FRAGMENT = gql`
  fragment TodoFragment on ToDo {
    id
    recipeId
    file
    title
    caption
    isTimer
    time
    step
  }
`;
export const RECIPE_FRAGMENT = gql`
  fragment RecipeFragment on Recipe {
    id
    chefId
    disCount
    title
    caption
    thumbNails
    servings
    difficulty
    cookingTime
    commentsCount
    givnStar
    starsCount
    starAverage
    toDosCount
    isMine
  }
`;

export const MEDO_FRAGMENT = gql`
  fragment MeDoFragment on MeDo {
    id
    mecipeId
    originalId
    memo
    isTimer
    time
    step
  }
`;

export const MECIPE_FRAGMENT = gql`
  fragment MecipeFragment on Mecipe {
    id
    originalId
    chef {
      userName
      profilePhoto
    }
    memo
    servings
    difficulty
    cookingTime
  }
`;

export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    user {
      userName
      profilePhoto
    }
    content
    isMine
    createdAt
  }
`;

export const RECOMMENT_FRAGMENT = gql`
  fragment RecommentFragment on Recomment {
    id
    user {
      userName
      profilePhoto
    }
    content
    isMine
    createdAt
  }
`;

export const STAR_FRAGMENT = gql`
  fragment StarFragment on Star {
    id
    user {
      userName
      profilePhoto
    }
    star
    createdAt
  }
`;
