const express = require("express");
const userController = require("../controllers/userController");
const { validateBody } = require("../middleware/validateBody");
const { userSchema } = require("../schemas/userSchema");
const { doPasswordsMatch, isPasswordMinLength, doesUserExist } = require("../middleware/userMiddleware");
const { hashPassword } = require("../middleware/hashPassword");
const { verifyToken } = require("../middleware/verifyToken");
const { verifyAdmin } = require("../middleware/verifyAdmin");
const { verifyUser } = require("../middleware/verifyUser");

const router = express.Router();

router
.get("/search", verifyToken, verifyAdmin, userController.getSearchedUsers)
.get("/:id/full", verifyToken, verifyAdmin, userController.getFullUser)
.get("/:id", verifyToken, verifyUser, userController.getUser)
.get("/", verifyToken, verifyAdmin, userController.getAllUsers)
.put("/:id", verifyToken, verifyUser, validateBody(userSchema), doPasswordsMatch, isPasswordMinLength, doesUserExist, hashPassword, userController.updateUser)

module.exports = router;