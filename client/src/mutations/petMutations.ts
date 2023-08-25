import { gql } from "@apollo/client";

const ADD_PET = gql`
  mutation addPet(
    $type: String!
    $name: String!
    $breed: String!
    $location: String!
    $description: String!
    $adoptionFee: Float!
    $age: Float!
    $gender: String!
    $size: String!
    $personality: Array!
    $coatLength: String!
    $houseTrained: Boolean!
    $health: Array!
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
      pets {
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
  }
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
      id
      type {
        name
      }
      name
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

const DELETE_PET = gql`
  mutation deletePet($id: ID!) {
    deletePet(id: $id) {
      id
      name
    }
  }
`;

export { ADD_PET, UPDATE_PET, DELETE_PET };
