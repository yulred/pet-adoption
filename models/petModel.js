const mongoose = require("mongoose");
const { petSchema } = require("../mongoose/schemas/petSchema");
const { userModel } = require("./userModel");

const petModel = mongoose.model("pets", petSchema);

async function getSearchedPets(query) {
  try {
    let nRe = new RegExp(`^[${query.name}]`, "i");
    let qRe = new RegExp(`${query.q}`, "i");

    if (query.name) query.name = nRe;

    if (query.height) {
      let height = query.height.split(/[\s-]+/);
      query.height = { $gte: height[0], $lte: height[1] };
    }

    if (query.weight) {
      let weight = query.weight.split(/[\s-]+/);
      query.weight = { $gte: weight[0], $lte: weight[1] };
    }

    if (query.q) {
      query.$or = [ {type: qRe}, {name: qRe}, {adoptionStatus: qRe}, {color: qRe}, {bio: qRe}, {breed: qRe} ];
    }
    
    const searchedPets = await petModel.find(query, { name: 1, type: 1, adoptionStatus: 1, picture: 1 }).sort({ name: 1 });
    return searchedPets
  } catch(err) {
    console.log(err);
  }
}

async function getPet(petID) {
  try {
    const pet = await petModel.findById(petID);
    return pet;
  } catch(err) {
    console.log(err);
  }
}

async function adoptPet(petID, currentUser) {
  try {
    if (currentUser.action === "adopt") {
      const pet = await petModel.findByIdAndUpdate(
        { _id: petID },
        { adoptionStatus: "Adopted" },
        { new: true }
      )

      const user = await userModel.findByIdAndUpdate(
        { _id: currentUser.userID },
        { $addToSet: { "pets.adopted": petID } },
        { new: true }
      )

      return { pet, user };
    }
    
    if (currentUser.action === "foster") {
      const pet = await petModel.findByIdAndUpdate(
        { _id: petID },
        { adoptionStatus: "Fostered" },
        { new: true }
      )

      const user = await userModel.findByIdAndUpdate(
        { _id: currentUser.userID },
        { $addToSet: { "pets.fostered": petID } },
        { new: true }
      )

      return { pet, user };
    }
  } catch(err) {
    console.log(err);
  }
}

async function returnPet(petID, currentUser) {
  try {
    const pet = await petModel.findByIdAndUpdate(
      { _id: petID },
      { adoptionStatus: "Available" },
      { new: true }
    )

    const user = await userModel.findByIdAndUpdate(
      { _id: currentUser.userID },
      { $pull: { "pets.adopted": petID, "pets.fostered": petID } },
      { new: true }
    )

    return { pet, user };
  } catch(err) {
    console.log(err);
  }
}

async function savePet(petID, currentUser) {
  try {
    const user = await userModel.findByIdAndUpdate(
      { _id: currentUser.userID },
      { $addToSet: { "pets.saved": petID } },
      { new: true }
    )

    return {user};
  } catch(err) {
    console.log(err);
  }
}

async function deleteSavedPet(petID, currentUser) {
  try {
    const user = await userModel.findByIdAndUpdate(
      { _id: currentUser.userID },
      { $pull: { "pets.saved": petID } },
      { new: true }
    )

    return {user};
  } catch(err) {
    console.log(err);
  }
}

async function getUsersPets(userID) {
  try {
    const user = await userModel.findById(userID);

    const ownedPets = await petModel.find({"_id": {$in: [...user.pets.adopted, ...user.pets.fostered]}});
    const savedPets = await petModel.find({"_id" : {$in: [...user.pets.saved]}});

    return {ownedPets, savedPets};
  } catch(err) {
    console.log(err);
  }
}

async function editPet(pet) {
  try {
    const petToUpdate = {};

    for (const key in pet) {
      if (pet[key] && key !== "id" && key !== "owner") petToUpdate[key] = pet[key];
    }

    const updatedPet = await petModel.findByIdAndUpdate({ _id: pet.id }, petToUpdate, { new: true });
    return updatedPet;
  } catch(err) {
    console.log(err);
  }
}

async function addPet(pet) {
  try {
    const petToAdd = {};

    for (const key in pet) {
      if (pet[key] && key !== "id" && key !== "owner") petToAdd[key] = pet[key];
    }

    const newPet = await petModel.create(petToAdd);
    return newPet;
  } catch(err) {
    console.log(err);
  }
}

module.exports = { getSearchedPets, getPet, adoptPet, returnPet, savePet, deleteSavedPet, getUsersPets, editPet, addPet };