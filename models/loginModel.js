const mongoose = require("mongoose");
const { authModel, generateAuthToken } = require("./authModel");
const { loginSchema } = require("../mongoose/schemas/loginSchema");

const loginModel = mongoose.model("User", loginSchema, "users");

async function loginUser(userID) {
  try {
    const authToken = generateAuthToken();
    const newToken = await authModel.findOneAndUpdate({ user: userID._id }, { token: authToken }, { upsert: true, new: true });
    return newToken;
  } catch(err) {
    console.log(err);
  }
}

module.exports = { loginModel, loginUser };