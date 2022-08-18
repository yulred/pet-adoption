const petsModel = require("../models/petsModel");

async function getSearchedPets(req, res) {
  try {
    let query = req.query;
    const searchedPets = await petsModel.getSearchedPets(query);
    res.send(searchedPets);
  } catch(err) {
    res.sendStatus(500).send(err);
  }
}

async function getPet(req, res) {
  try {
    let { id } = req.params;
    const pet = await petsModel.getPet(id);
    res.send(pet);
  } catch(err) {
    res.sendStatus(500).send(err);
  }
}

module.exports = {getSearchedPets, getPet};