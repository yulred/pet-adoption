const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  type: String,
  name: String,
  adoptionStatus: String,
  picture: String,
  height: Number,
  weight: Number,
  color: String,
  bio: String,
  hypoallergnic: Boolean,
  dietery: [String],
  breed: String,
})

const petsModel = mongoose.model("pets", petSchema);

async function getSearchedPets(query) {
  try {
    let queryObj = {};
    let nRe = new RegExp(`^[${query.name}]`, "i");
    let qRe = new RegExp(`${query.q}`, "i");

    if (query.type) queryObj.type = query.type;
    if (query.status) queryObj.adoptionStatus = query.status;
    if (query.name) queryObj.name = nRe;

    if (query.height) {
      height = query.height.split(/[\s-]+/);
      queryObj.height = {$gte: height[0], $lte: height[1]};
    }

    if (query.weight) {
      weight = query.weight.split(/[\s-]+/);
      queryObj.weight = {$gte: weight[0], $lte: weight[1]};
    }

    if (query.q) {
      queryObj.$or = [{type: qRe }, {name: qRe}, {adoptionStatus: qRe}, {color: qRe}, {bio: qRe}, {breed: qRe}];
    }
    
    const searchedPets = await petsModel.find(queryObj);

    return searchedPets.sort((a, b) => a.name.localeCompare(b.name));
  } catch(err) {
    console.log(err);
  }
}

async function getPet(id) {
  try {
    const pet = await petsModel.findById(id)
    return pet;
  } catch(err) {
    console.log(err);
  }
}

module.exports = {getSearchedPets, getPet};