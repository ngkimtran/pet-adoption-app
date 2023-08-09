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

export { GET_ANIMALS };
