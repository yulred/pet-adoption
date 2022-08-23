const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  type: String,
  name: String,
  adoptionStatus: String,
  picture: String,
  height: Number,
  weight: Number,
  color: String,
  bio: String,
  hypoallergnic: Boolean,
  dietery: [String],
  breed: String,
})

module.exports = { petSchema };