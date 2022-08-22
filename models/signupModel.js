const mongoose = require("mongoose");
const { signupSchema } = require("../schemas/signupSchema");

const signupModel = mongoose.model("NewUser", signupSchema, "users");

async function signupUser(newUser) {
  try {
    const user = await signupModel.create(newUser);
    return user;
  } catch(err) {
    console.log(err);
  }
}

module.exports = { signupUser, signupModel };