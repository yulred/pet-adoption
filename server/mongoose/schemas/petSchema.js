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
  hypoallergenic: Boolean,
  dietary: [String],
  breed: String,
},
{ timestamps: true })

module.exports = { petSchema };