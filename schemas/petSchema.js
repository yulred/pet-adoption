const mongoose = require("mongoose");

const petSchemaAjv = {
  type: "object",
  properties: {
    type: { type: "string" },
    name: { type: "string" },
    adoptionStatus: { type: "string" },
    picture: { type: "string" },
    height: { type: "number" },
    weight: { type: "number" },
    color: { type: "string" },
    bio: { type: "string" },
    hypoallergnic: { type: "boolean" },
    dietery: { type: "array" },
    breed: { type: "string" },
  },
}

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

module.exports = { petSchemaAjv, petSchema };