import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login(
    $email: String!
    $password: String!
  ) {
    login(
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
        email
        recipeCount
        SavedRecipes {
          recipeId
          image
          link
          title
          description
        }
      }
    }
  }
`;

export const SAVE_RECIPE = gql`
  mutation saveRecipe($newRecipe: inputRecipe!) {
    saveRecipe(newRecipe: $newRecipe) {
      _id
      username
      email
      SavedRecipes {
        recipeId
        description
        title
        image
        link
      }
    }
  }
`;

export const REMOVE_RECIPE = gql`
  mutation removeRecipe($recipeId: ID!) {
    removeRecipe(recipeId: $recipeId) {
      _id
      username
      email
      SavedRecipes {
        recipeId
        description
        title
        image
        link
      }
    }
  }
`;
