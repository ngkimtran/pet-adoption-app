import { gql } from "@apollo/client";
import { PET_DETAILS } from "../fragments/fragments";

const GET_PETS = gql`
  query getPets($type: String) {
    pets(type: $type) {
      ...PetDetails
    }
  }
  ${PET_DETAILS}
`;

const GET_PET = gql`
  query getPet($id: ID, $name: String) {
    pet(id: $id, name: $name) {
      ...PetDetails
    }
  }
  ${PET_DETAILS}
`;

export { GET_PETS, GET_PET };
