const mongoose = require("mongoose");

const { Schema } = mongoose;

const Square = mongoose.model(
  "square",
  new Schema({
    balance: { type: Number, default: 0 },
    name: { type: String, required: true },
    description: String,
    goal: { type: Number, required: true },
  })
);

module.exports = Square;
