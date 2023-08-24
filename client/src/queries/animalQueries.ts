import { gql } from "@apollo/client";

const GET_ANIMALS = gql`
  query getAnimals {
    animals {
      id
      name
      petCount
    }
  }
`;

const GET_ANIMAL = gql`
  query getAnimal($id: ID, $name: String) {
    animal(id: $id, name: $name) {
      id
      name
      petCount
    }
  }
`;

export { GET_ANIMALS, GET_ANIMAL };
