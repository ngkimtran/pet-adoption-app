const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema.ts");
const connectDBfunc = require("./config/db.ts");

require("dotenv").config();

const app = express();

connectDBfunc();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Sever running on port ${port}`));
