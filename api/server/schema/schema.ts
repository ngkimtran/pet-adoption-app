import Pet from "../models/Pet";
import Animal from "../models/Animal";

import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";

const AnimalType = new GraphQLObjectType({
  name: "Animal",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    petIds: {
      type: new GraphQLList(PetType),
      resolve(parent) {
        return Pet.find(parent.petIds);
      },
    },
  }),
});

const CharacteristicType = new GraphQLObjectType({
  name: "Characteristic",
  fields: () => ({
    age: { type: GraphQLInt },
    gender: { type: GraphQLString },
    size: { type: GraphQLString },
    personality: { type: new GraphQLList(GraphQLString) },
    coatLength: { type: GraphQLString },
    houseTrained: { type: GraphQLBoolean },
    health: { type: new GraphQLList(GraphQLString) },
  }),
});

const PetType = new GraphQLObjectType({
  name: "Pet",
  fields: () => ({
    id: { type: GraphQLID },
    type: { type: GraphQLString },
    name: { type: GraphQLString },
    breed: { type: GraphQLString },
    location: { type: GraphQLString },
    description: { type: GraphQLString },
    characteristic: { type: CharacteristicType },
    adoptionFee: { type: GraphQLFloat },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    animalTypes: {
      type: new GraphQLList(AnimalType),
      resolve() {
        return Animal.find();
      },
    },
    animalType: {
      type: AnimalType,
      args: { id: { type: GraphQLID } },
      resolve(_parent, args) {
        return Animal.findById(args.id);
      },
    },
    pets: {
      type: new GraphQLList(PetType),
      resolve() {
        return Pet.find();
      },
    },
    pet: {
      type: PetType,
      args: { id: { type: GraphQLID } },
      resolve(_parent, args) {
        return Pet.findById(args.id);
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
});
