const mongoose = require("mongoose");
const { emailRegExp, telRegExp } = require("../../config");

const signupSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [emailRegExp, "Invalid e-mail."],
  },
  password: {
    type: String,
    minLength: 8,
    required: true,
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

module.exports = { signupSchema };