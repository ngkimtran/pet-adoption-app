const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
// const cors = require("cors");
const schema = require("./schema/schema.ts");
const connectDBfunc = require("./config/db.ts");

require("dotenv").config();
connectDBfunc();

const port = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs: schema.typeDefs,
  resolvers: schema.resolvers,
});

// server.use(cors());

startStandaloneServer(server, {
  listen: { port },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
