const express = require("express");
const petsController = require("../controllers/petsController");

const router = express.Router();

router.get("/", petsController.getSearchedPets);

router.get("/:id", petsController.getPet);

module.exports = router;