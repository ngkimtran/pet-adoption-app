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

export { GET_USER };
