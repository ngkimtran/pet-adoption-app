import mongoose from "mongoose";

const PetSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Dog", "Cat"],
  },
  name: { type: String },
  breed: { type: String },
  location: { type: String },
  description: { type: String },
  characteristic: {
    age: { type: Number },
    gender: { type: String },
    size: { type: String },
    personality: { type: Array(String) },
    coatLength: { type: String },
    houseTrained: { type: Boolean },
    health: { type: new Array(String) },
  },
  adoptionFee: { type: mongoose.Schema.Types.Decimal128 },
});

export default mongoose.model("Pet", PetSchema);
