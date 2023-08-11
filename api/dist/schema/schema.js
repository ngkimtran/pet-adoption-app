var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Pet = require("../models/Pet");
const Animal = require("../models/Animal");
const { GraphQLBoolean, GraphQLFloat, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString, } = require("graphql");
const AnimalType = new GraphQLObjectType({
    name: "Animal",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        petCount: { type: GraphQLInt },
    }),
});
const CharacteristicType = new GraphQLObjectType({
    name: "Characteristic",
    fields: () => ({
        age: { type: GraphQLString },
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
        type: { type: AnimalType },
        name: { type: GraphQLString },
        breed: { type: GraphQLString },
        location: { type: GraphQLString },
        description: { type: GraphQLString },
        adoptionFee: { type: GraphQLFloat },
        characteristic: { type: CharacteristicType },
    }),
});
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        // Pet
        pets: {
            type: new GraphQLList(PetType),
            args: { type: { type: GraphQLString } },
            resolve(_parents, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (args.type) {
                        const animalFilter = yield Animal.findOne({ name: args.type });
                        return Pet.find({ type: animalFilter._id }).populate("type", {
                            name: 1,
                        });
                    }
                    return Pet.find().populate("type", {
                        name: 1,
                    });
                });
            },
        },
        pet: {
            type: PetType,
            args: { id: { type: GraphQLID } },
            resolve(_parent, args) {
                return Pet.findById(args.id).populate("type", {
                    name: 1,
                });
            },
        },
        // Animal
        animals: {
            type: new GraphQLList(AnimalType),
            resolve() {
                return __awaiter(this, void 0, void 0, function* () {
                    const animals = yield Animal.find();
                    animals.map((a) => __awaiter(this, void 0, void 0, function* () {
                        a.petCount = yield Pet.find({ type: a._id }).count();
                        return a.save();
                    }));
                    return Animal.find();
                });
            },
        },
        animal: {
            type: AnimalType,
            args: { name: { type: GraphQLString } },
            resolve(_parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    const animal = yield Animal.findOne({ name: args.name });
                    animal.petCount = yield Pet.find({ type: animal._id }).count();
                    animal.save();
                    return Animal.findOne({ name: args.name });
                });
            },
        },
    },
});
const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        // Pet
        addPet: {
            type: PetType,
            args: {
                type: { type: GraphQLNonNull(GraphQLString) },
                name: { type: GraphQLNonNull(GraphQLString) },
                breed: { type: GraphQLString },
                location: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLString },
                adoptionFee: { type: GraphQLNonNull(GraphQLFloat) },
                // characteristics
                age: { type: GraphQLNonNull(GraphQLString) },
                gender: { type: GraphQLString },
                size: { type: GraphQLString },
                personality: { type: new GraphQLList(GraphQLString) },
                coatLength: { type: GraphQLString },
                houseTrained: { type: GraphQLBoolean },
                health: { type: new GraphQLList(GraphQLString) },
            },
            resolve(_parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    let animalType = yield Animal.findOne({ name: args.type });
                    if (!animalType) {
                        const newAnimalType = new Animal({ name: args.type });
                        animalType = yield newAnimalType.save();
                    }
                    const pet = new Pet({
                        type: animalType._id,
                        name: args.name,
                        breed: args.breed,
                        location: args.location,
                        description: args.description,
                        adoptionFee: args.adoptionFee,
                        // characteristics
                        characteristic: {
                            age: args.age,
                            gender: args.gender,
                            size: args.size,
                            personality: args.personality,
                            coatLength: args.coatLength,
                            houseTrained: args.houseTrained,
                            health: args.health,
                        },
                    });
                    return pet.save();
                });
            },
        },
        updatePet: {
            type: PetType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                type: { type: GraphQLString },
                name: { type: GraphQLString },
                breed: { type: GraphQLString },
                location: { type: GraphQLString },
                description: { type: GraphQLString },
                adoptionFee: { type: GraphQLFloat },
                // characteristics
                age: { type: GraphQLString },
                gender: { type: GraphQLString },
                size: { type: GraphQLString },
                personality: { type: new GraphQLList(GraphQLString) },
                coatLength: { type: GraphQLString },
                houseTrained: { type: GraphQLBoolean },
                health: { type: new GraphQLList(GraphQLString) },
            },
            resolve(_parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    const oldPet = yield Pet.findById(args.id);
                    let animalType = undefined;
                    if (args.type) {
                        animalType = yield Animal.findOne({ name: args.type });
                        if (!animalType) {
                            const newAnimalType = new Animal({ name: args.type });
                            animalType = yield newAnimalType.save();
                        }
                    }
                    return Pet.findByIdAndUpdate(args.id, {
                        $set: {
                            type: animalType ? animalType._id : oldPet.type,
                            name: args.name ? args.name : oldPet.name,
                            breed: args.breed ? args.breed : oldPet.breed,
                            location: args.location ? args.location : oldPet.location,
                            description: args.description
                                ? args.description
                                : oldPet.description,
                            adoptionFee: args.adoptionFee
                                ? args.adoptionFee
                                : oldPet.adoptionFee,
                            // characteristics
                            characteristic: {
                                age: args.age ? args.age : oldPet.characteristic.age,
                                gender: args.gender
                                    ? args.gender
                                    : oldPet.characteristic.gender,
                                size: args.size ? args.size : oldPet.characteristic.size,
                                personality: args.personality
                                    ? args.personality
                                    : oldPet.characteristic.personality,
                                coatLength: args.coatLength
                                    ? args.coatLength
                                    : oldPet.characteristic.coatLength,
                                houseTrained: args.houseTrained
                                    ? args.houseTrained
                                    : oldPet.characteristic.houseTrained,
                                health: args.health
                                    ? args.health
                                    : oldPet.characteristic.health,
                            },
                        },
                    }, { new: true });
                });
            },
        },
        deletePet: {
            type: PetType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(_parent, args) {
                return Pet.findByIdAndRemove(args.id);
            },
        },
        // Animal
        addAnimal: {
            type: AnimalType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(_parent, args) {
                const animal = new Animal({ name: args.name });
                return animal.save();
            },
        },
        deleteAnimal: {
            type: AnimalType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(_parent, args) {
                return Animal.findByIdAndRemove(args.id);
            },
        },
    },
});
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
});
//# sourceMappingURL=schema.js.map