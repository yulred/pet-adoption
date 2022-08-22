const petModel = require("../models/petModel");

async function getSearchedPets(req, res) {
  try {
    const searchedPets = await petModel.getSearchedPets(req.query);
    res.send(searchedPets);
  } catch(err) {
    res.status(500).send(err);
  }
}

async function getPet(req, res) {
  try {
    let { id } = req.params;
    const pet = await petModel.getPet(id);
    res.send(pet);
  } catch(err) {
    res.status(500).send(err);
  }
}

module.exports = { getSearchedPets, getPet };