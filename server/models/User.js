const mongoose = require("mongoose");

const { Schema } = mongoose;

const User = mongoose.model(
  "main_account",
  new Schema({
    balance: { type: Number, default: 0 },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    squares: [
      {
        type: Schema.Types.ObjectId,
        ref: "square",
      },
    ],
  })
);

module.exports = User;
