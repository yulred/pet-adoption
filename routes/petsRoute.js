const express = require("express");
const petsController = require("../controllers/petsController");

const router = express.Router();

router.get("/", petsController.getAllPets);

router.get("/:id", petsController.getPet);

module.exports = router;