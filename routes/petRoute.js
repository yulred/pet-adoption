const express = require("express");
const petController = require("../controllers/petController");

const router = express.Router();

router.get("/user/:id", petController.getUsersPets);

router.post("/:id/adopt", petController.adoptPet);

router.post("/:id/save", petController.savePet);

router.delete("/:id/save", petController.clearSavedPet);

router.post("/:id/return", petController.returnPet);

router.get("/:id", petController.getPet);

router.get("/", petController.getSearchedPets);

module.exports = router;