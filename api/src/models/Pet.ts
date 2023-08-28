const petMongoose = require("mongoose");

const PetSchema = new petMongoose.Schema({
  type: {
    type: petMongoose.Schema.Types.ObjectId,
    ref: "Animal",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: { type: String },
  adoptionFee: {
    type: Number,
    required: true,
  },
  characteristic: {
    age: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE"],
      required: true,
    },
    size: { type: String },
    personality: { type: Array(String) },
    coatLength: { type: String },
    houseTrained: { type: Boolean },
    health: { type: Array(String) },
  },
});

module.exports = petMongoose.model("Pet", PetSchema);
