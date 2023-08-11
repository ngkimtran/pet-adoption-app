const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require("./config/db");
const app = express();
connectDB();
app.use(cors());
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
}));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Sever running on port ${port}`));
//# sourceMappingURL=index.js.map