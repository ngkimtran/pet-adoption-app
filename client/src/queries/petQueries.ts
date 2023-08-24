import { gql } from "@apollo/client";

const GET_PETS = gql`
  query getPets($type: String) {
    pets(type: $type) {
      id
      name
      type {
        id
        name
      }
      breed
      location
      description
      adoptionFee
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
`;

const GET_PET = gql`
  query getPet($id: ID, $name: String) {
    pet(id: $id, name: $name) {
      id
      name
      type {
        id
        name
      }
      breed
      location
      description
      adoptionFee
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
`;

export { GET_PETS, GET_PET };
