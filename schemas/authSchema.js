const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  user: { type: String },
  token: { type: String },
})

module.exports = { authSchema };