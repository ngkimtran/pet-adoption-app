import { Gender, Role } from "../constants/constants";

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
    age: string;
    coatLength: string;
    gender: Gender;
    health: Array<string>;
    houseTrained: boolean;
    personality: Array<string>;
    size: string;
    __typename: string;
  };
  description: string;
  id: string;
  location: string;
  name: string;
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
  role: Role;
  favorites: {
    breed: string;
    type: {
      id: string;
      name: string;
      __typename: string;
    };
    characteristic: {
      age: string;
      coatLength: string;
      gender: string;
      health: Array<string>;
      houseTrained: boolean;
      personality: Array<string>;
      size: string;
      __typename: string;
    };
    id: string;
    location: string;
    name: string;
    __typename: string;
  }[];
  __typename: string;
};
