const express = require("express");
const authController = require("../controllers/authController");
const { verifyToken } = require("../middleware/verifyToken");

const router = express.Router();

router.get("/", verifyToken, authController.authenticateUser);

module.exports = router;