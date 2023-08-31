import { AGE, GENDER, ROLE, SIZE } from "../constants/constants";

export type Animal = {
  id: string;
  name: string;
  petCount: number;
  __typename: string;
};

export type Pet = {
  adoptionFee: number;
  breed: string;
  characteristic: {
    age: AGE;
    coatLength: string;
    gender: GENDER;
    health: Array<string>;
    houseTrained: boolean;
    personality: Array<string>;
    size: SIZE;
    __typename: string;
  };
  description: string;
  id: string;
  location: string;
  name: string;
  image: string;
  type: {
    id: string;
    name: string;
    __typename: string;
  };
  __typename: string;
};

export type User = {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  role: ROLE;
  favorites: {
    adoptionFee: number;
    breed: string;
    characteristic: {
      age: AGE;
      coatLength: string;
      gender: GENDER;
      health: Array<string>;
      houseTrained: boolean;
      personality: Array<string>;
      size: SIZE;
      __typename: string;
    };
    description: string;
    id: string;
    location: string;
    name: string;
    image: string;
    type: {
      id: string;
      name: string;
      __typename: string;
    };
    __typename: string;
  }[];
  __typename: string;
};
