import { gql } from "@apollo/client";

const GET_USER = gql`
  query getUser($id: ID, $username: String) {
    user(username: $username, id: $id) {
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

const CURRENT_USER = gql`
  query currentUser {
    me {
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

export { GET_USER, CURRENT_USER };
