import { gql } from "@apollo/client";

const GET_USER = gql`
  query getUser($id: ID, $username: String) {
    user(username: $username, id: $id) {
      id
      username
      firstname
      lastname
      email
      role
      favorites {
        id
      }
    }
  }
`;

const CURRENT_USER = gql`
  query currentUser {
    me {
      id
      username
      firstname
      lastname
      email
      role
      favorites {
        id
      }
    }
  }
`;

export { GET_USER, CURRENT_USER };
