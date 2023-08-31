import mongoose from "mongoose";

const PetSchema = new mongoose.Schema({
  type: {
    type: mongoose.Schema.Types.ObjectId,
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
  description: {
    type: String,
    required: true,
  },
  adoptionFee: {
    type: Number,
    required: true,
  },
  characteristic: {
    age: {
      type: String,
      enum: ["BABY", "YOUNG", "ADULT", "SENIOR"],
      required: true,
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE"],
      required: true,
    },
    size: {
      type: String,
      enum: ["SMALL", "MEDIUM", "LARGE", "EXTRALARGE"],
      required: true,
    },
    personality: {
      type: Array(String),
      required: true,
    },
    coatLength: {
      type: String,
      required: true,
    },
    houseTrained: {
      type: Boolean,
      required: true,
    },
    health: {
      type: Array(String),
      required: true,
    },
  },
  image: {
    type: String,
  },
});

export default mongoose.model("Pet", PetSchema);
