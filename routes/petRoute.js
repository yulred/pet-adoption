const express = require("express");
const petController = require("../controllers/petController");

const router = express.Router();

router.post("/:id/adopt", petController.adoptPet);

router.post("/:id/save", petController.savePet);

router.post("/:id/return", petController.returnPet);

router.get("/:id", petController.getPet);

router.get("/", petController.getSearchedPets);

module.exports = router;