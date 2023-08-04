"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sampleData_1 = require("../sampleData");
const graphql_1 = require("graphql");
const AnimalType = new graphql_1.GraphQLObjectType({
    name: "Animal Type",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
    }),
});
const CharacteristicType = new graphql_1.GraphQLObjectType({
    name: "Characteristic",
    fields: () => ({
        age: { type: graphql_1.GraphQLInt },
        gender: { type: graphql_1.GraphQLString },
        size: { type: graphql_1.GraphQLString },
        personality: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        coatLength: { type: graphql_1.GraphQLString },
        houseTrained: { type: graphql_1.GraphQLBoolean },
        health: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
    }),
});
const PetType = new graphql_1.GraphQLObjectType({
    name: "Pet",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        type: { type: AnimalType },
        name: { type: graphql_1.GraphQLString },
        breed: { type: graphql_1.GraphQLString },
        location: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        characteristic: { type: CharacteristicType },
        adoptionFee: { type: graphql_1.GraphQLFloat },
    }),
});
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        animalTypes: {
            type: new graphql_1.GraphQLList(AnimalType),
            resolve() {
                return sampleData_1.animalTypes;
            },
        },
        animalType: {
            type: AnimalType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(_parent, args) {
                return sampleData_1.pets.find((pet) => pet.id === args.id);
            },
        },
        pets: {
            type: new graphql_1.GraphQLList(PetType),
            resolve() {
                return sampleData_1.pets;
            },
        },
        pet: {
            type: PetType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(_parent, args) {
                return sampleData_1.pets.find((pet) => pet.id === args.id);
            },
        },
    },
});
exports.default = new graphql_1.GraphQLSchema({
    query: RootQuery,
});
//# sourceMappingURL=schema.js.map