const fs = require("fs");
const path = require("path");

const petsDbPath = path.resolve(__dirname, "../data/petsDb.json");

function getAllPets() {
  try {
    const allPets = fs.readFileSync(petsDbPath);
    return JSON.parse(allPets);
  } catch(err) {
    console.log(err);
  }
}

function getPet(query) {
  try {
    const allPets = fs.readFileSync(petsDbPath);
    const pet = JSON.parse(allPets).find(item => item.name.toLowerCase() === query);
    return pet;
  } catch(err) {
    console.log(err);
  }
}

module.exports = {getAllPets, getPet};