const express = require("express");
const petController = require("../controllers/petController");
const { upload } = require("../middleware/storeImage");
const { validateBody } = require("../middleware/validateBody");
const { imageUrl } = require("../middleware/imageUrl");
const { petSchema } = require("../schemas/petSchema");

const router = express.Router();

router
.get("/user/:id", petController.getUsersPets)
.post("/:id/adopt", petController.adoptPet)
.post("/:id/return", petController.returnPet)
.post("/:id/save", petController.savePet)
.delete("/:id/save", petController.deleteSavedPet)
.get("/:id", petController.getPet)
.put("/:id", validateBody(petSchema), upload.single("picture"), imageUrl, petController.editPet)
.post("/", petController.addPet)
.get("/", petController.getSearchedPets)

module.exports = router;