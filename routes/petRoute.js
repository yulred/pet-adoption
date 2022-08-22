const express = require("express");
const petController = require("../controllers/petController");

const router = express.Router();

router.get("/", petController.getSearchedPets);

router.get("/:id", petController.getPet);

module.exports = router;