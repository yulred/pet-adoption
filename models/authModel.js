const mongoose = require("mongoose");
const crypto = require("crypto");
const { authSchema } = require("../schemas/authSchema");

const authModel = mongoose.model("tokens", authSchema);

function generateAuthToken() {
  return crypto.randomBytes(30).toString("hex");
}

module.exports = { authModel, generateAuthToken };