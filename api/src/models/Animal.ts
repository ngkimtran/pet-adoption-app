import mongoose from "mongoose";

const AnimalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  petCount: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Animal", AnimalSchema);
