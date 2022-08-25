const express = require("express");
const petController = require("../controllers/petController");

const router = express.Router();

router
.get("/user/:id", petController.getUsersPets)
.post("/:id/adopt", petController.adoptPet)
.post("/:id/return", petController.returnPet)
.post("/:id/save", petController.savePet)
.delete("/:id/save", petController.deleteSavedPet)
.get("/:id", petController.getPet)
.get("/", petController.getSearchedPets)

module.exports = router;