import { gql } from "@apollo/client";

const ADD_ANIMAL = gql`
  mutation addAnimal($name: String!) {
    addAnimal(name: $name) {
      id
      name
      petCount
    }
  }
`;

const DELETE_ANIMAL = gql`
  mutation deleteAnimal($id: ID!) {
    deleteAnimal(id: $id) {
      id
      name
      petCount
    }
  }
`;

export { ADD_ANIMAL, DELETE_ANIMAL };
