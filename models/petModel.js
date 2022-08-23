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
      query.$or = [ {type: qRe }, {name: qRe}, {adoptionStatus: qRe}, {color: qRe}, {bio: qRe}, {breed: qRe} ];
    }
    
    const searchedPets = await petModel.find(query);

    return searchedPets.sort((a, b) => a.name.localeCompare(b.name));
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
      [ { $set: {
        "pets.saved": {
          $cond: [
            { $in: [petID, "$pets.saved"] },
            { $filter: { input: "$pets.saved", cond: { $eq: ["$pets.saved", petID] } } },
            { $concatArrays: [ "$pets.saved", [petID] ] }
          ]
        }
      }, } ],
      { new: true }
    )

    return user;
  } catch(err) {
    console.log(err);
  }
}

module.exports = { getSearchedPets, getPet, adoptPet, returnPet, savePet };