"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
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
    breed: { type: String },
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
        gender: { type: String },
        size: { type: String },
        personality: { type: Array(String) },
        coatLength: { type: String },
        houseTrained: { type: Boolean },
        health: { type: Array(String) },
    },
});
module.exports = mongoose.model("Pet", PetSchema);
//# sourceMappingURL=Pet.js.map