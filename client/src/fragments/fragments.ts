import { gql } from "@apollo/client";

const ANIMAL_DETAILS = gql`
  fragment AnimalDetails on Animal {
    id
    name
    petCount
  }
`;

const PET_DETAILS = gql`
  fragment PetDetails on Pet {
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
    image
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
`;

const USER_DETAILS = gql`
  fragment UserDetails on User {
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
`;

const CURRENT_USER_DETAILS = gql`
  fragment CurrentUserDetails on User {
    id
    username
    firstname
    lastname
    email
    role
    favorites {
      id
      name
      type {
        name
      }
      breed
      location
      image
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

export { ANIMAL_DETAILS, PET_DETAILS, USER_DETAILS, CURRENT_USER_DETAILS };
