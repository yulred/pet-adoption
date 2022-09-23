const express = require("express");
const logoutController = require("../controllers/logoutController");
const { verifyToken } = require("../middleware/verifyToken");

const router = express.Router();

router.post("/", verifyToken, logoutController.logoutUser);

module.exports = router;