const {
  GraphQLError,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = require("graphql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Pet = require("../models/Pet.ts");
const Animal = require("../models/Animal.ts");
const User = require("../models/User.ts");

const SALT_WORK_FACTOR = 10;

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

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    favorites: { type: new GraphQLList(PetType) },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // Pet
    pets: {
      type: new GraphQLList(PetType),
      args: { type: { type: GraphQLString } },
      async resolve(_parents, args) {
        if (args.type) {
          const animalFilter = await Animal.findOne({ name: args.type });
          return Pet.find({ type: animalFilter._id }).populate("type", {
            name: 1,
          });
        }

        return Pet.find().populate("type", {
          name: 1,
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
      async resolve() {
        const animals = await Animal.find();
        animals.map(async (a) => {
          a.petCount = await Pet.find({ type: a._id }).count();
          return a.save();
        });
        return Animal.find();
      },
    },
    animal: {
      type: AnimalType,
      args: { name: { type: GraphQLString } },
      async resolve(_parent, args) {
        const animal = await Animal.findOne({ name: args.name });
        animal.petCount = await Pet.find({ type: animal._id }).count();
        animal.save();
        return Animal.findOne({ name: args.name });
      },
    },

    // User
    users: {
      type: new GraphQLList(UserType),
      async resolve() {
        return User.find().populate("favorites", {
          id: 1,
          name: 1,
        });
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      async resolve(_parent, args) {
        return User.findById(args.id).populate("favorites", {
          id: 1,
          name: 1,
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
      async resolve(_parent, args) {
        let animalType = await Animal.findOne({ name: args.type });

        if (animalType) {
          const newAnimalType = new Animal({ name: args.type });
          animalType = await newAnimalType.save();
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
      async resolve(_parent, args) {
        const oldPet = await Pet.findById(args.id);
        let animalType = undefined;

        if (args.type) {
          animalType = await Animal.findOne({ name: args.type });

          if (animalType) {
            const newAnimalType = new Animal({ name: args.type });
            animalType = await newAnimalType.save();
          }
        }

        return Pet.findByIdAndUpdate(
          args.id,
          {
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
          },
          { new: true }
        );
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

    // User
    addUser: {
      type: UserType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        username: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(_parent, args) {
        const passwordHash = await bcrypt.hash(args.password, SALT_WORK_FACTOR);

        const user = new User({
          name: args.name,
          email: args.email,
          username: args.username,
          password: passwordHash,
        });

        return user.save();
      },
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(_parent, args) {
        const oldUser = await User.findById(args.id);
        const passwordHash = args.password
          ? await bcrypt.hash(args.password, SALT_WORK_FACTOR)
          : oldUser.password;

        return User.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name ? args.name : oldUser.name,
              email: args.email ? args.email : oldUser.email,
              username: args.username ? args.username : oldUser.username,
              password: passwordHash,
            },
          },
          { new: true }
        );
      },
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(_parent, args) {
        return User.findByIdAndRemove(args.id);
      },
    },

    // Favorites
    updateFavorite: {
      type: UserType,
      args: {
        userId: { type: GraphQLNonNull(GraphQLID) },
        petId: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(_parent, args) {
        const user = await User.findById(args.userId).populate("favorites", {
          id: 1,
        });
        const pet = await Pet.findById(args.petId);
        const favorites =
          user.favorites.findIndex((p) => p.id === pet.id) === -1
            ? [...user.favorites, pet]
            : user.favorites.filter((p) => p.id !== pet.id);

        return User.findByIdAndUpdate(
          args.userId,
          {
            $set: {
              favorites,
            },
          },
          { new: true }
        );
      },
    },

    // Login
    login: {
      type: GraphQLString,
      args: {
        username: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(_parent, args) {
        const user = await User.findOne({ username: args.username }).select(
          "password"
        );

        const passwordCorrect =
          user === null
            ? false
            : await bcrypt.compare(args.password, user.password);

        if (!user || !passwordCorrect) {
          throw new GraphQLError("Wrong credentials", {
            extensions: {
              code: "BAD_USER_INPUT",
            },
          });
        }

        const userForToken = {
          username: user.username,
          id: user._id,
        };

        return jwt.sign(userForToken, process.env.JWT_SECRET);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
