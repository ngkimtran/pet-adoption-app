import express from "express";
import * as dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema";
import connectDB from "./config/db";

dotenv.config();

const app = express();
connectDB();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Sever running on port ${port}`));
