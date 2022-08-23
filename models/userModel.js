const mongoose = require("mongoose");
const { userSchema } = require("../mongoose/schemas/userSchema");

const userModel = mongoose.model("users", userSchema);

async function getUser(id) {
  try {
    const user = await userModel.findById(id);
    return user;
  } catch(err) {
    console.log(err);
  }
}

async function updateUser(user) {
  try {
    const update = {};

    for (const key in user) {
      if (key !== "id" && user[key] !== "") userToUpdate[key] = user[key];
    }
    
    const updatedUser = await userModel.findByIdAndUpdate({ _id: user.id }, update, { new: true });
    return updatedUser;
  } catch(err) {
    console.log(err);
  }
}

module.exports = { userModel, getUser, updateUser };