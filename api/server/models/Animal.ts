import mongoose from "mongoose";

const AnimalSchema = new mongoose.Schema({
  name: { type: String },
  petIds: {
    type: Array(mongoose.Schema.Types.ObjectId),
    ref: "Pet",
  },
});

export default mongoose.model("Animal", AnimalSchema);
