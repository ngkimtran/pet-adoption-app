const { GraphQLError } = require("graphql");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Pet = require("../models/Pet.ts");
const Animal = require("../models/Animal.ts");
const User = require("../models/User.ts");

const SALT_WORK_FACTOR = 10;

const typeDefs = `
  enum Role {
    ADMIN
    USER
  }

  type Characteristic {
    age: String!,
    gender: String,
    size: String,
    personality: [String],
    coatLength: String,
    houseTrained: Boolean,
    health: [String],
  }

  type Animal {
    id:  ID!,
    name: String!,
    petCount: Int,
  }

  type Pet {
    id: ID!,
    type: Animal!,
    name: String!,
    breed: String!,
    location: String!,
    description: String,
    adoptionFee: Float!,
    characteristic: Characteristic!,
  }

  type User {
    id: ID!,
    username: String!,
    password: String!,
    email: String!,
    firstname: String!,
    lastname: String!,
    favorites: [Pet],
    role: Role!,
  }

  type Query {
    pets(type: String): [Pet!],
    pet(id:ID, name: String): Pet!,
    animals: [Animal!],
    animal(id: ID, name: String): Animal!,
    users: [User!],
    user(id: ID, username: String): User!, 
    me: User
  }

  type Mutation {
    addPet(
        type: String!,
        name: String!,
        breed: String!,
        location: String!,
        description: String,
        adoptionFee: Float!,
        age: String!,
        gender: String,
        size: String,
        personality: [String],
        coatLength: String,
        houseTrained: Boolean,
        health: [String],
    ): Pet

    updatePet(
        id: ID!,
        type: String,
        name: String,
        breed: String,
        location: String,
        description: String,
        adoptionFee: Float,
        age: String,
        gender: String,
        size: String,
        personality: [String],
        coatLength: String,
        houseTrained: Boolean,
        health: [String],
    ): Pet

    deletePet(id: ID!): Pet

    addAnimal(name: String!): Animal

    deleteAnimal(id: ID!): Animal,

    addUser(
        firstname: String!,
        lastname: String!,
        email: String!,
        username: String!,
        password: String!,
        role: String,
    ): User,

    updateUser(
        id: ID!,
        firstname: String!,
        lastname: String!,
        email: String!,
        username: String!,
        password: String,
    ): User,

    deleteUser(id: ID!): User,

    updateFavorite(petId: ID!): User,

    updateRole( id: ID!, role: String!): User,

    login(
        username: String!,
        password: String!,
    ): String,
  }
`;

const Query = {
  pets: async (_parents, args) => {
    if (args.type) {
      const animalFilter = await Animal.findOne({ name: args.type });
      return Pet.find({ type: animalFilter._id }).populate({
        path: "type",
        select: {
          id: 1,
          name: 1,
        },
      });
    }
    return Pet.find().populate({
      path: "type",
      select: {
        id: 1,
        name: 1,
      },
    });
  },

  pet: async (_parents, args) => {
    if (args.id)
      return Pet.findById(args.id).populate({
        path: "type",
        select: {
          id: 1,
          name: 1,
        },
      });
    if (args.name)
      return Pet.findOne({ name: args.name }).populate({
        path: "type",
        select: {
          id: 1,
          name: 1,
        },
      });
  },

  animals: async () => {
    const animals = await Animal.find();
    animals.map(async (a) => {
      a.petCount = await Pet.find({ type: a._id }).count();
      return a.save();
    });
    return Animal.find();
  },

  animal: async (_parent, args) => {
    let animal;
    if (args.id) {
      animal = await Animal.findById(args.id);
      animal.petCount = await Pet.find({ type: animal._id }).count();
      animal.save();
      return Animal.findById(args.id);
    }
    if (args.name) {
      animal = await Animal.findOne({ name: args.name });
      animal.petCount = await Pet.find({ type: animal._id }).count();
      animal.save();
      return Animal.findOne({ name: args.name });
    }
  },

  users: async () =>
    User.find().populate({
      path: "favorites",
      select: {
        id: 1,
        name: 1,
      },
    }),

  user: async (_parent, args) => {
    if (args.id)
      return User.findById(args.id).populate({
        path: "favorites",
        select: {
          id: 1,
          name: 1,
        },
      });
    if (args.username)
      return User.findOne({ username: args.username }).populate({
        path: "favorites",
        select: {
          id: 1,
          name: 1,
        },
      });
  },

  me: (_root, _args, { currentUser }) =>
    currentUser.populate({
      path: "favorites",
      select: {
        id: 1,
        name: 1,
        breed: 1,
        location: 1,
        characteristic: 1,
      },
      populate: {
        path: "type",
        select: {
          id: 1,
          name: 1,
        },
      },
    }),
};

const Mutation = {
  addPet: async (_parent, args) => {
    let animalType = await Animal.findOne({ name: args.type });

    if (!animalType) {
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

  updatePet: async (_parent, args) => {
    const oldPet = await Pet.findById(args.id);
    let animalType = undefined;

    if (args.type) {
      animalType = await Animal.findOne({ name: args.type });

      if (!animalType) {
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
          description: args.description ? args.description : oldPet.description,
          adoptionFee: args.adoptionFee ? args.adoptionFee : oldPet.adoptionFee,
          // characteristics
          characteristic: {
            age: args.age ? args.age : oldPet.characteristic.age,
            gender: args.gender ? args.gender : oldPet.characteristic.gender,
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
            health: args.health ? args.health : oldPet.characteristic.health,
          },
        },
      },
      { new: true }
    ).populate({
      path: "type",
      select: {
        id: 1,
        name: 1,
      },
    });
  },

  deletePet: async (_parent, args) => Pet.findByIdAndRemove(args.id),

  addAnimal: (_parent, args) => {
    const animal = new Animal({ name: args.name });

    return animal.save();
  },

  deleteAnimal: async (_parent, args) => Animal.findByIdAndRemove(args.id),

  addUser: async (_parent, args) => {
    const passwordHash = await bcrypt.hash(args.password, SALT_WORK_FACTOR);

    const user = new User({
      firstname: args.firstname,
      lastname: args.lastname,
      email: args.email,
      username: args.username,
      password: passwordHash,
      role: args.role ? args.role.toUpperCase() : "USER",
    });

    return user.save();
  },

  updateUser: async (_parent, args) => {
    const oldUser = await User.findById(args.id);
    const passwordHash = args.password
      ? await bcrypt.hash(args.password, SALT_WORK_FACTOR)
      : oldUser.password;

    return User.findByIdAndUpdate(
      args.id,
      {
        $set: {
          firstname: args.firstname,
          lastname: args.lastname,
          email: args.email,
          username: args.username,
          password: passwordHash,
        },
      },
      { new: true }
    );
  },

  deleteUser: async (_parent, args) => User.findByIdAndRemove(args.id),

  updateFavorite: async (_parent, args, { currentUser }) => {
    if (!currentUser) {
      throw new GraphQLError("Wrong credentials", {
        extensions: { code: "BAD_USER_INPUT" },
      });
    }

    await currentUser.populate({
      path: "favorites",
      select: {
        id: 1,
        name: 1,
      },
    });

    const pet = await Pet.findById(args.petId);
    const favorites =
      currentUser.favorites.findIndex((p) => p.id === pet.id) === -1
        ? [...currentUser.favorites, pet]
        : currentUser.favorites.filter((p) => p.id !== pet.id);

    return User.findByIdAndUpdate(
      currentUser.id,
      {
        $set: {
          favorites,
        },
      },
      { new: true }
    ).populate({
      path: "favorites",
      select: {
        id: 1,
        name: 1,
      },
    });
  },

  updateRole: async (_parent, args, { currentUser }) => {
    if (currentUser.role !== "ADMIN") {
      throw new GraphQLError("No permissions", {
        extensions: { code: "FORBIDDEN" },
      });
    }

    return User.findByIdAndUpdate(
      args.id,
      {
        $set: {
          role: args.role,
        },
      },
      { new: true }
    );
  },

  login: async (_parent, args) => {
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
};

const resolvers = {
  Query,
  Mutation,
};

module.exports = { typeDefs, resolvers };
