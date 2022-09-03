const mongoose = require("mongoose");
const { userSchema } = require("../mongoose/schemas/userSchema");

const userModel = mongoose.model("users", userSchema);

async function getUser(id) {
  try {
    const user = await userModel.findById(id, { password: 0, createdAt: 0, updatedAt: 0, __v: 0 });
    return user;
  } catch(err) {
    console.log(err);
  }
}

async function updateUser(user) {
  try {
    const userToUpdate = {};

    for (const key in user) {
      if (user[key]) userToUpdate[key] = user[key];
    }
    
    const updatedUser = await userModel.findByIdAndUpdate(
      { _id: user.userID },
      userToUpdate,
      { new: true }
    )

    return updatedUser;
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
    const users = await userModel.find({}, { name: 1, email: 1, role: 1, createdAt: 1 });
    return users;
  } catch(err) {
    console.log(err);
  }
}

async function getSearchedUsers(query) {
  try {
    let queryRe = new RegExp(`${query.q}`, "i");

    const users = await userModel.find({ $or: [ {name: queryRe}, {email: queryRe} ] }, { name: 1, email: 1 });
    return users;
  } catch(err) {
    console.log(err);
  }
}

async function adoptPet(petID, userID, action) {
  try {
    if (action === "adopt") {
      const user = await userModel.findByIdAndUpdate(
        { _id: userID },
        { $addToSet: { "pets.adopted": petID } },
        { new: true }
      )

      return user;
    }
    
    if (action === "foster") {
      const user = await userModel.findByIdAndUpdate(
        { _id: userID },
        { $addToSet: { "pets.fostered": petID } },
        { new: true }
      )

      return user;
    }
  } catch(err) {
    console.log(err);
  }
}

async function returnPet(petID, userID = undefined) {
  try {
    if (userID) {
      const user = await userModel.findByIdAndUpdate(
        { _id: userID },
        { $pull: { "pets.adopted": petID, "pets.fostered": petID } },
        { new: true }
      )
    
      return user;
    } else {
      const user = await userModel.findOneAndUpdate(
        { $or: [ {"pets.adopted": { $in: [petID] } }, {"pets.fostered": { $in: [petID] } } ] },
        { $pull: { "pets.adopted": petID, "pets.fostered": petID } },
        { new: true }
      )

      return user;
    }
  } catch(err) {
    console.log(err);
  }
}

async function savePet(petID, userID) {
  try {
    const user = await userModel.findByIdAndUpdate(
      { _id: userID },
      { $addToSet: { "pets.saved": petID } },
      { new: true }
    )

    return user;
  } catch(err) {
    console.log(err);
  }
}

async function deleteSavedPet(petID, userID) {
  try {
    const user = await userModel.findByIdAndUpdate(
      { _id: userID },
      { $pull: { "pets.saved": petID } },
      { new: true }
    )

    return user;
  } catch(err) {
    console.log(err);
  }
}

module.exports = { userModel, getUser, updateUser, getFullUser, getAllUsers, getSearchedUsers, adoptPet, returnPet, savePet, deleteSavedPet };