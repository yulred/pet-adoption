const mongoose = require("mongoose");

const loginSchemaAjv = {
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
    },
    password: {
      type: "string",
      minLength: 8,
    },
  },
  required: ["email", "password"],
}

const loginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
})

module.exports = { loginSchemaAjv, loginSchema };