import { gql } from "@apollo/client";

const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $name: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      name: $name
      email: $email
      password: $password
    ) {
      id
      username
      name
      email
      favorites {
        id
      }
    }
  }
`;

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

const UPDATE_FAVORITE = gql`
  mutation updateFavorite($petId: ID!) {
    updateFavorite(petId: $petId) {
      id
      username
      name
      email
      favorites {
        id
      }
    }
  }
`;

export { ADD_USER, LOGIN, UPDATE_FAVORITE };
