import { gql } from "@apollo/client";
import { ANIMAL_DETAILS } from "../fragments/fragments";

const GET_ANIMALS = gql`
  query getAnimals {
    animals {
      ...AnimalDetails
    }
  }
  ${ANIMAL_DETAILS}
`;

const GET_ANIMAL = gql`
  query getAnimal($id: ID, $name: String) {
    animal(id: $id, name: $name) {
      ...AnimalDetails
    }
  }
  ${ANIMAL_DETAILS}
`;

export { GET_ANIMALS, GET_ANIMAL };
