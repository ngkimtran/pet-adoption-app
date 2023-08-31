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
    EXTRALARGE
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

export default typeDefs;
