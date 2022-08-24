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
    const userToUpdate = {};

    for (const key in user) {
      if (user[key] && key !== "id") userToUpdate[key] = user[key];
    }
    
    const updatedUser = await userModel.findByIdAndUpdate({ _id: user.id }, userToUpdate, { new: true });
    return updatedUser;
  } catch(err) {
    console.log(err);
  }
}

module.exports = { userModel, getUser, updateUser };