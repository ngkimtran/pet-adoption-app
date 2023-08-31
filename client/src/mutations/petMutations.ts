import { gql } from "@apollo/client";
import { PET_DETAILS } from "../fragments/fragments";

const ADD_PET = gql`
  mutation addPet(
    $type: String!
    $name: String!
    $breed: String!
    $location: String!
    $description: String!
    $adoptionFee: Float!
    $age: String!
    $gender: String!
    $size: String!
    $personality: [String]!
    $coatLength: String!
    $houseTrained: Boolean!
    $health: [String]!
  ) {
    addPet(
      type: $type
      name: $name
      breed: $breed
      location: $location
      description: $description
      adoptionFee: $adoptionFee
      age: $age
      gender: $gender
      size: $size
      personality: $personality
      coatLength: $coatLength
      houseTrained: $houseTrained
      health: $health
    ) {
      ...PetDetails
    }
  }
  ${PET_DETAILS}
`;

const UPDATE_PET = gql`
  mutation updatePet(
    $id: ID!
    $type: String!
    $name: String!
    $breed: String!
    $location: String!
    $description: String!
    $adoptionFee: Float!
    $age: String!
    $gender: String!
    $size: String!
    $personality: [String]!
    $coatLength: String!
    $houseTrained: Boolean!
    $health: [String]!
  ) {
    updatePet(
      id: $id
      type: $type
      name: $name
      breed: $breed
      location: $location
      description: $description
      adoptionFee: $adoptionFee
      age: $age
      gender: $gender
      size: $size
      personality: $personality
      coatLength: $coatLength
      houseTrained: $houseTrained
      health: $health
    ) {
      ...PetDetails
    }
  }
  ${PET_DETAILS}
`;

const DELETE_PET = gql`
  mutation deletePet($id: ID!) {
    deletePet(id: $id) {
      id
      name
    }
  }
`;

export { ADD_PET, UPDATE_PET, DELETE_PET };
