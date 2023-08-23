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
        name
        type {
          name
        }
        breed
        location
        characteristic {
          age
          gender
          size
          personality
          coatLength
          houseTrained
          health
        }
      }
    }
  }
`;

export { GET_USER, CURRENT_USER };
