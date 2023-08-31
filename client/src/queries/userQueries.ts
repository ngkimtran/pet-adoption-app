import { gql } from "@apollo/client";
import { CURRENT_USER_DETAILS, USER_DETAILS } from "../fragments/fragments";

const GET_USERS = gql`
  query getUsers {
    users {
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

const GET_USER = gql`
  query getUser($id: ID, $username: String) {
    user(username: $username, id: $id) {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;

const CURRENT_USER = gql`
  query currentUser {
    me {
      ...CurrentUserDetails
    }
  }
  ${CURRENT_USER_DETAILS}
`;

export { GET_USERS, GET_USER, CURRENT_USER };
