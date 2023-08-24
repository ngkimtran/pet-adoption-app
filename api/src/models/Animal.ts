const animalMongoose = require("mongoose");

const AnimalSchema = new animalMongoose.Schema({
  name: {
    type: String,
    required: true,
    index: { unique: true },
  },
  petCount: {
    type: Number,
    default: 0,
  },
});

module.exports = animalMongoose.model("Animal", AnimalSchema);
