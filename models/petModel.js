const mongoose = require("mongoose");
const { petSchema } = require("../mongoose/schemas/petSchema");
const { userModel } = require("./userModel");

const petModel = mongoose.model("pets", petSchema);

async function getSearchedPets(query) {
  try {
    let nameRe = new RegExp(`^[${query.name}]`, "i");
    let queryRe = new RegExp(`${query.q}`, "i");

    if (query.name) query.name = nameRe;

    if (query.height) {
      let height = query.height.split(/[\s-]+/);
      query.height = { $gte: height[0], $lte: height[1] };
    }

    if (query.weight) {
      let weight = query.weight.split(/[\s-]+/);
      query.weight = { $gte: weight[0], $lte: weight[1] };
    }

    if (query.q) {
      query.$or = [ {type: queryRe}, {name: queryRe}, {adoptionStatus: queryRe}, {color: queryRe}, {bio: queryRe}, {breed: queryRe} ];
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

async function adoptPet(petID, action) {
  try {
    if (action === "adopt") {
      const pet = await petModel.findByIdAndUpdate(
        { _id: petID },
        { adoptionStatus: "Adopted" },
        { new: true }
      )

      return pet;
    }
    
    if (action === "foster") {
      const pet = await petModel.findByIdAndUpdate(
        { _id: petID },
        { adoptionStatus: "Fostered" },
        { new: true }
      )

      return pet;
    }
  } catch(err) {
    console.log(err);
  }
}

async function returnPet(petID) {
  try {
    const pet = await petModel.findByIdAndUpdate(
      { _id: petID },
      { adoptionStatus: "Available" },
      { new: true }
    )

    return pet;
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
      if (pet[key] && key !== "id" && key !== "owner" && key !== "dietary") petToUpdate[key] = pet[key];
    }

    if (pet.dietary) petToUpdate.dietary = pet.dietary.split(/[,\s]+/);

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

    if (pet.dietary) petToAdd.dietary = pet.dietary.split(/[,\s]+/);

    const newPet = await petModel.create(petToAdd);
    return newPet;
  } catch(err) {
    console.log(err);
  }
}

module.exports = { getSearchedPets, getPet, adoptPet, returnPet, getUsersPets, editPet, addPet };