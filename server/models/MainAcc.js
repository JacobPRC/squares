const mongoose = require("mongoose");

const { Schema } = mongoose;

const MainAcc = mongoose.model(
  "main_account",
  new Schema({
    balance: { type: Number, default: 0 },
  })
);

module.exports = MainAcc;
