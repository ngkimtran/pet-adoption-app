"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
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
module.exports = mongoose.model("Animal", AnimalSchema);
//# sourceMappingURL=Animal.js.map