const mongoose = require("mongoose");
const { emailRegExp, telRegExp } = require("../../config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
  },
  email: {
    type: String,
    match: [emailRegExp, "Invalid e-mail."],
  },
  password: {
    type: String,
    minLength: 8,
  },
  tel: {
    type: String,
    match: [telRegExp, "Invalid phone number."],
  },
  bio: {
    type: String,
    maxLength: 350,
  },
  pets: {
    adopted: Array,
    fostered: Array,
    saved: Array,
  },
},
{ timestamps: true })

module.exports = { userSchema };