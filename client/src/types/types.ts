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
    age: number;
    coatLength: string;
    gender: string;
    health: Array<String>;
    houseTrained: boolean;
    personality: Array<String>;
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
