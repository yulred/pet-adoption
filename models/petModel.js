const mongoose = require("mongoose");
const { petSchema } = require("../schemas/petSchema");

const petModel = mongoose.model("pets", petSchema);

async function getSearchedPets(query) {
  try {
    let nRe = new RegExp(`^[${query.name}]`, "i");
    let qRe = new RegExp(`${query.q}`, "i");

    if (query.name) query.name = nRe;

    if (query.height) {
      let height = query.height.split(/[\s-]+/);
      query.height = {$gte: height[0], $lte: height[1]};
    }

    if (query.weight) {
      let weight = query.weight.split(/[\s-]+/);
      query.weight = {$gte: weight[0], $lte: weight[1]};
    }

    if (query.q) {
      query.$or = [{type: qRe }, {name: qRe}, {adoptionStatus: qRe}, {color: qRe}, {bio: qRe}, {breed: qRe}];
    }
    
    const searchedPets = await petModel.find(query);

    return searchedPets.sort((a, b) => a.name.localeCompare(b.name));
  } catch(err) {
    console.log(err);
  }
}

async function getPet(id) {
  try {
    const pet = await petModel.findById(id);
    return pet;
  } catch(err) {
    console.log(err);
  }
}

module.exports = { getSearchedPets, getPet };