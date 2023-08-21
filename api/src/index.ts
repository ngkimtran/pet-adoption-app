const jsonwebtoken = require("jsonwebtoken");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const schema = require("./schema/schema.ts");
const connectDBfunc = require("./config/db.ts");

const UserModel = require("./models/User");

require("dotenv").config();
connectDBfunc();

const port = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs: schema.typeDefs,
  resolvers: schema.resolvers,
});

startStandaloneServer(server, {
  listen: { port },
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jsonwebtoken.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await UserModel.findById(decodedToken.id).populate(
        "favorites",
        {
          id: 1,
          name: 1,
        }
      );
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
