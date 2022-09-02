const petModel = require("../models/petModel");
const userModel = require("../models/userModel");

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
    const { id } = req.params;
    const pet = await petModel.getPet(id);
    res.send(pet);
  } catch(err) {
    res.status(500).send(err);
  }
}

async function adoptPet(req, res) {
  try {
    const { id } = req.params;
    const pet = await petModel.adoptPet(id, req.body);
    res.send(pet);
  } catch(err) {
    res.status(500).send(err);
  }
}

async function returnPet(req, res) {
  try {
    const { id } = req.params;
    const pet = await petModel.returnPet(id, req.body);
    res.send(pet);
  } catch(err) {
    res.status(500).send(err);
  }
}

async function savePet(req, res) {
  try {
    const { id } = req.params;
    const pet = await petModel.savePet(id, req.body);
    res.send(pet);
  } catch(err) {
    res.status(500).send(err);
  }
}

async function deleteSavedPet(req, res) {
  try {
    const { id } = req.params;
    const pet = await petModel.deleteSavedPet(id, req.body);
    res.send(pet);
  } catch(err) {
    res.status(500).send(err);
  }
}

async function getUsersPets(req, res) {
  try {
    const { id } = req.params;
    const pets = await petModel.getUsersPets(id);
    res.send(pets);
  } catch(err) {
    res.status(500).send(err);
  }
}

async function editPet(req, res) {
  try {
    const pet = await petModel.editPet(req.body);

    // if (req.body.adoptionStatus === "Adopted") await userModel.adoptPet(req.body.id, req.body.owner);
    // if (req.body.adoptionStatus === "Fostered") await userModel.fosterPet(req.body.id, req.body.owner);

    res.send({ ok: true });
  } catch(err) {
    res.status(500).send(err);
  }
}

async function addPet(req, res) {
  try {
    const pet = await petModel.addPet(req.body);

    console.log(req.body.adoptionStatus)

    if (req.body.adoptionStatus === "Adopted") await userModel.adoptPet(req.body.id, req.body.owner);
    if (req.body.adoptionStatus === "Fostered") await userModel.fosterPet(req.body.id, req.body.owner);

    res.send({ ok: true });
  } catch(err) {
    res.status(500).send(err);
  }
}

module.exports = { getSearchedPets, getPet, adoptPet, returnPet, savePet, deleteSavedPet, getUsersPets, editPet, addPet };