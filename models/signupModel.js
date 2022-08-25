const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
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
    const token = jwt.sign({ id: user._id.toString() }, process.env.TOKEN_KEY, { expiresIn: "14d" });
    return token;
  } catch(err) {
    console.log(err);
  }
}

module.exports = { signupUser, signupModel };