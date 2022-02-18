import { gql } from "@apollo/client";

export const TODO_FRAGMENT = gql`
  fragment TodoParts on ToDo {

  }
`;
export const RECIPE_FRAGMENT = gql`
  fragment RecipeParts on Recipe {
    
  }
`;

export const USER_FRAGMENT = gql`
  fragment UserParts on User {
    id
    firstName
    lastName
    userName
    email
    phoneNumber
    bio
    profilePhoto
    recipes
    dips
    mecipes
    stars
    subscribersCount
    subscribingsCount
  }
`;
