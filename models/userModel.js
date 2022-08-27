const mongoose = require("mongoose");
const { userSchema } = require("../mongoose/schemas/userSchema");

const userModel = mongoose.model("users", userSchema);

async function getUser(id) {
  try {
    const user = await userModel.findById(id, { password: 0, createdAt: 0, updatedAt: 0, __v: 0 }); //restrict to userID? what to exclude?
    return user;
  } catch(err) {
    console.log(err);
  }
}

async function getFullUser(id) {
  try {
    const user = await userModel.findById(id, { password: 0 });
    return user;
  } catch(err) {
    console.log(err);
  }
}

async function getAllUsers() {
  try {
    const user = await userModel.find({}, { name: 1, email: 1, tel: 1, role: 1 });
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

module.exports = { userModel, getUser, getFullUser, getAllUsers, updateUser };