const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { loginSchema } = require("../mongoose/schemas/loginSchema");

const loginModel = mongoose.model("User", loginSchema, "users");

async function loginUser(userID) {
  try {
    const token = jwt.sign({ id: userID }, process.env.TOKEN_KEY, { expiresIn: "14d" });
    return token;
  } catch(err) {
    console.log(err);
  }
}

module.exports = { loginModel, loginUser };