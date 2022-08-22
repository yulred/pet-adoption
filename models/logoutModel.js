const mongoose = require("mongoose");
const { authSchema } = require("../schemas/authSchema");

const authModel = mongoose.model("Token", authSchema, "tokens");

async function logoutUser(cookie) {
  try {
    await authModel.deleteOne(cookie);
    return;
  } catch(err) {
    console.log(err);
  }
}

module.exports = { logoutUser };