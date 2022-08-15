const petsModel = require("../models/petsModel");

async function getAllPets(req, res) {
  try {
    const allPets = petsModel.getAllPets();
    res.send(allPets);
  } catch(err) {
    res.sendStatus(500).send(err);
  }
}

async function getPet(req, res) {
  try {
    let query = req.params.id;
    const pet = petsModel.getPet(query);
    res.send(pet);
  } catch(err) {
    res.sendStatus(500).send(err);
  }
}

module.exports = {getAllPets, getPet};