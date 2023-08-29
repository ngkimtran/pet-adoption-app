import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import jsonwebtoken from "jsonwebtoken";
import "dotenv/config";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import { typeDefs, resolvers } from "./schema/schema";
import connectDB from "./config/db";
import User from "./models/User";

connectDB();
interface ServerContext {
  token?: string;
}

const app = express();
const httpServer = http.createServer(app);
const port = process.env.PORT || 5000;

const server = new ApolloServer<ServerContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  "/",
  cors<cors.CorsRequest>(),
  bodyParser.json({ limit: "50mb" }),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.startsWith("Bearer ")) {
        const decodedToken = jsonwebtoken.verify(
          auth.substring(7),
          process.env.JWT_SECRET
        );
        const currentUser = await User.findById(decodedToken.id).populate({
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
        });
        return { currentUser };
      }
    },
  })
);

await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));

console.log(`🚀 Server ready at port ${port}`);
