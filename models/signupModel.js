const mongoose = require("mongoose");
const { signupSchema } = require("../mongoose/schemas/signupSchema");

const signupModel = mongoose.model("NewUser", signupSchema, "users");

async function signupUser(newUser) {
  try {
    newUser.bio = "";
    newUser.role = "user";
    newUser.pets = {
      adopted: [],
      fostered: [],
      saved: [],
    }
    const user = await signupModel.create(newUser);
    return user;
  } catch(err) {
    console.log(err);
  }
}

module.exports = { signupUser, signupModel };