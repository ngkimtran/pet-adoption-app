import { GraphQLError } from "graphql";
import { Stripe } from "stripe";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import Pet from "../models/Pet";
import Animal from "../models/Animal";
import User from "../models/User";

import { toCapitalize } from "../utilities/utilities";

const SALT_WORK_FACTOR = 10;

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, {
  apiVersion: "2023-08-16",
});

const typeDefs = `
  enum Role {
    ADMIN
    USER
  }

  enum Gender {
    MALE
    FEMALE
  }

  enum Age {
    BABY
    YOUNG
    ADULT
    SENIOR
  }

  enum Size {
    SMALL
    MEDIUM
    LARGE
    EXRTALARGE
  }

  type Characteristic {
    age: Age!,
    gender: Gender!,
    size: Size!,
    personality: [String]!,
    coatLength: String!,
    houseTrained: Boolean!,
    health: [String]!,
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
    me: User,
    createCheckoutSession(
      petName: String!,
      adoptionFee: Float!
    ): String,
  }

  type Mutation {
    addPet(
        type: String!,
        name: String!,
        breed: String!,
        location: String!,
        description: String!,
        adoptionFee: Float!,
        age: String!,
        gender: String!,
        size: String!,
        personality: [String]!,
        coatLength: String!,
        houseTrained: Boolean!,
        health: [String]!,
    ): Pet

    updatePet(
        id: ID!,
        type: String!,
        name: String!,
        breed: String!,
        location: String!,
        description: String!,
        adoptionFee: Float!,
        age: String!,
        gender: String!,
        size: String!,
        personality: [String]!,
        coatLength: String!,
        houseTrained: Boolean!,
        health: [String]!,
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
      return Pet.findOne({ name: toCapitalize(args.name) }).populate({
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

  createCheckoutSession: async (_parent, args) => {
    const petToBeAdopted = {
      price_data: {
        currency: "eur",
        product_data: {
          name: args.petName,
        },
        unit_amount: args.adoptionFee * 100, //unit amount is in cent by default
      },
      quantity: 1,
    };

    const session = await stripe.checkout.sessions.create({
      line_items: [petToBeAdopted],
      mode: "payment",
      success_url: `${process.env.REACT_APP_FRONTEND}?sucess=true`,
      cancel_url: `${process.env.REACT_APP_FRONTEND}?sucess=false`,
      payment_method_types: ["card", "paypal"],
    });

    return JSON.stringify({
      url: session.url,
    });
  },
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
      name: toCapitalize(args.name),
      breed: args.breed,
      location: args.location,
      description: args.description,
      adoptionFee: args.adoptionFee,
      // characteristics
      characteristic: {
        age: args.age.toUpperCase(),
        gender: args.gender.toUpperCase(),
        size: args.size.toUpperCase(),
        personality: args.personality,
        coatLength: args.coatLength,
        houseTrained: args.houseTrained,
        health: args.health,
      },
    });

    pet.populate({
      path: "type",
      select: {
        id: 1,
        name: 1,
      },
    });

    return pet.save();
  },

  updatePet: async (_parent, args) => {
    const animalType = await Animal.findOne({ name: args.type });
    console.log(args.health);
    return Pet.findByIdAndUpdate(
      args.id,
      {
        $set: {
          type: animalType._id,
          name: toCapitalize(args.name),
          breed: args.breed,
          location: args.location,
          description: args.description,
          adoptionFee: args.adoptionFee,
          // characteristics
          characteristic: {
            age: args.age.toUpperCase(),
            gender: args.gender.toUpperCase(),
            size: args.size.toUpperCase(),
            personality: args.personality,
            coatLength: args.coatLength,
            houseTrained: args.houseTrained,
            health: args.health,
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
      firstname: toCapitalize(args.firstname),
      lastname: toCapitalize(args.lastname),
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
          firstname: toCapitalize(args.firstname),
          lastname: toCapitalize(args.lastname),
          email: args.email,
          username: args.username,
          password: passwordHash,
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

    return JSON.stringify({
      token: jwt.sign(userForToken, process.env.JWT_SECRET),
    });
  },
};

const resolvers = {
  Query,
  Mutation,
};

export { typeDefs, resolvers };
