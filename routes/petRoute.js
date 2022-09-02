const express = require("express");
const petController = require("../controllers/petController");
const { validateBody } = require("../middleware/validateBody");
const { upload, imageUrl, cloudinaryUpload } = require("../middleware/imageMiddleware");
const { petSchema } = require("../schemas/petSchema");
const { verifyToken } = require("../middleware/verifyToken");
const { verifyAdmin } = require("../middleware/verifyAdmin");
const { verifyUser } = require("../middleware/verifyUser");

const router = express.Router();

router
.post("/new", verifyToken, verifyAdmin, validateBody(petSchema), upload.single("picture"), imageUrl, cloudinaryUpload, petController.addPet)
.get("/user/:id", verifyToken, verifyUser, petController.getUsersPets)
.post("/:id/adopt", verifyToken, petController.adoptPet)
.post("/:id/return", verifyToken, petController.returnPet)
.post("/:id/save", verifyToken, petController.savePet)
.delete("/:id/save", verifyToken, petController.deleteSavedPet)
.get("/:id", petController.getPet)
.put("/:id", verifyToken, verifyAdmin, validateBody(petSchema), upload.single("picture"), imageUrl, cloudinaryUpload, petController.editPet)
.get("/", petController.getSearchedPets)

module.exports = router;