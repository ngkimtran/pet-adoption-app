import { gql } from "@apollo/client";
import { ANIMAL_DETAILS } from "../fragments/fragments";

const ADD_ANIMAL = gql`
  mutation addAnimal($name: String!) {
    addAnimal(name: $name) {
      ...AnimalDetails
    }
  }
  ${ANIMAL_DETAILS}
`;

const DELETE_ANIMAL = gql`
  mutation deleteAnimal($id: ID!) {
    deleteAnimal(id: $id) {
      ...AnimalDetails
    }
  }
  ${ANIMAL_DETAILS}
`;

export { ADD_ANIMAL, DELETE_ANIMAL };
