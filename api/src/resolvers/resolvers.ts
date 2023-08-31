import { GraphQLError } from "graphql";
import { Stripe } from "stripe";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import Pet from "../models/Pet";
import Animal from "../models/Animal";
import User from "../models/User";

import { toCapitalize } from "../utilities/utilities";

const SALT_WORK_FACTOR = 10;
const PLACEHOLDER_IMG = "https://i.imgur.com/9K7ztcM.png";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, {
  apiVersion: "2023-08-16",
});

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
        adoptionFee: 1,
        description: 1,
        id: 1,
        name: 1,
        breed: 1,
        location: 1,
        characteristic: 1,
        image: 1,
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
  addPet: async (_parent, args, { currentUser }) => {
    if (currentUser.role !== "ADMIN") {
      throw new GraphQLError("No permissions", {
        extensions: { code: "FORBIDDEN" },
      });
    }

    let animalType = await Animal.findOne({ name: args.type });

    if (!animalType) {
      const newAnimalType = new Animal({ name: args.type });
      animalType = await newAnimalType.save();
    }

    const pet = new Pet({
      type: animalType._id,
      name: toCapitalize(args.name),
      breed: toCapitalize(args.breed),
      location: args.location,
      description: args.description,
      adoptionFee: args.adoptionFee,
      // characteristics
      characteristic: {
        age: args.age.toUpperCase(),
        gender: args.gender.toUpperCase(),
        size: args.size.toUpperCase(),
        personality: args.personality.map((p: string) => p.toLowerCase()),
        coatLength: args.coatLength.toLowerCase(),
        houseTrained: args.houseTrained,
        health: args.health.map((h: string) => h.toLowerCase()),
      },
      image: args.image ? args.image : PLACEHOLDER_IMG,
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

  updatePet: async (_parent, args, { currentUser }) => {
    if (currentUser.role !== "ADMIN") {
      throw new GraphQLError("No permissions", {
        extensions: { code: "FORBIDDEN" },
      });
    }

    const animalType = await Animal.findOne({ name: args.type });

    return Pet.findByIdAndUpdate(
      args.id,
      {
        $set: {
          type: animalType._id,
          name: toCapitalize(args.name),
          breed: toCapitalize(args.breed),
          location: args.location,
          description: args.description,
          adoptionFee: args.adoptionFee,
          // characteristics
          characteristic: {
            age: args.age.toUpperCase(),
            gender: args.gender.toUpperCase(),
            size: args.size.toUpperCase(),
            personality: args.personality.map((p: string) => p.toLowerCase()),
            coatLength: args.coatLength.toLowerCase(),
            houseTrained: args.houseTrained,
            health: args.health.map((h: string) => h.toLowerCase()),
          },
          image: args.image,
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

  deletePet: async (_parent, args, { currentUser }) => {
    if (currentUser.role !== "ADMIN") {
      throw new GraphQLError("No permissions", {
        extensions: { code: "FORBIDDEN" },
      });
    }

    return Pet.findByIdAndRemove(args.id);
  },

  addAnimal: async (_parent, args) => {
    const isNotUnique = await Animal.findOne({ name: args.name });
    if (isNotUnique) {
      throw new GraphQLError("Name must be unique for each animal type.", {
        extensions: {
          code: "BAD_USER_INPUT",
          invalidArgs: args.name,
        },
      });
    }

    const animal = new Animal({ name: args.name.toLowerCase() });

    return animal.save();
  },

  deleteAnimal: async (_parent, args, { currentUser }) => {
    if (currentUser.role !== "ADMIN") {
      throw new GraphQLError("No permissions", {
        extensions: { code: "FORBIDDEN" },
      });
    }

    return Animal.findByIdAndRemove(args.id);
  },

  addUser: async (_parent, args) => {
    const isNotUniqueUsername = await User.find({ username: args.username });
    const isNotUniqueEmail = await User.find({ email: args.email });

    if (isNotUniqueUsername) {
      throw new GraphQLError("Username already taken.", {
        extensions: {
          code: "BAD_USER_INPUT",
          invalidArgs: args.username,
        },
      });
    }

    if (isNotUniqueEmail) {
      throw new GraphQLError("Email already taken.", {
        extensions: {
          code: "BAD_USER_INPUT",
          invalidArgs: args.email,
        },
      });
    }

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

    const isNotUniqueUsername = await User.find({ username: args.username });
    const isNotUniqueEmail = await User.find({ email: args.email });

    if (isNotUniqueUsername) {
      throw new GraphQLError("Username already taken.", {
        extensions: {
          code: "BAD_USER_INPUT",
          invalidArgs: args.username,
        },
      });
    }

    if (isNotUniqueEmail) {
      throw new GraphQLError("Email already taken.", {
        extensions: {
          code: "BAD_USER_INPUT",
          invalidArgs: args.email,
        },
      });
    }

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

  deleteUser: async (_parent, args, { currentUser }) => {
    if (currentUser.id !== args.id || currentUser.role !== "ADMIN") {
      throw new GraphQLError("No permissions", {
        extensions: { code: "FORBIDDEN" },
      });
    }

    return User.findByIdAndRemove(args.id);
  },

  updateFavorite: async (_parent, args, { currentUser }) => {
    if (!currentUser) {
      throw new GraphQLError("Login required", {
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

export default resolvers;
