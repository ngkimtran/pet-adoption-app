import { gql } from "@apollo/client";

const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
    ) {
      id
      username
      firstname
      lastname
      email
      favorites {
        id
      }
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser(
    $id: ID!
    $firstname: String!
    $lastname: String!
    $email: String!
    $username: String!
    $password: String
  ) {
    updateUser(
      id: $id
      username: $username
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
    ) {
      id
      username
      firstname
      lastname
      email
      favorites {
        id
      }
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
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
      firstname
      lastname
      email
      favorites {
        id
      }
    }
  }
`;

const UPDATE_ROLE = gql`
  mutation updateRole($id: ID!, $role: String!) {
    updateRole(id: $id, role: $role) {
      id
      firstname
      lastname
      username
      email
      role
    }
  }
`;

export {
  ADD_USER,
  UPDATE_USER,
  LOGIN,
  UPDATE_FAVORITE,
  DELETE_USER,
  UPDATE_ROLE,
};
