const dbMongoose = require("mongoose");

const connectDB = async () => {
  const connection = await dbMongoose.connect(process.env.MONGO_URI);

  console.log(`MongoDB Connected: ${connection.connection.host}`);
};

module.exports = connectDB;
