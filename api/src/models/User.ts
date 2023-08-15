const userMongoose = require("mongoose");

const UserSchema = new userMongoose.Schema({
  username: {
    type: String,
    required: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  email: {
    type: String,
    required: true,
    index: { unique: true },
  },
  name: {
    type: String,
    required: true,
  },
  favorites: [
    {
      type: userMongoose.Schema.Types.ObjectId,
      ref: "Pet",
    },
  ],
});

module.exports = userMongoose.model("User", UserSchema);
