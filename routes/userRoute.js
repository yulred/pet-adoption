const express = require("express");
const userController = require("../controllers/userController");
const { validateBody } = require("../middleware/validateBody");
const { userSchema } = require("../schemas/userSchema");
const { doPasswordsMatch, isPasswordMinLength, doesUserExist } = require("../middleware/userMiddleware");
const { hashPassword } = require("../middleware/hashPassword");

const router = express.Router();

router
.get("/:id/full", userController.getFullUser)
.get("/:id", userController.getUser)
.get("/", userController.getAllUsers)
.put("/", validateBody(userSchema), doPasswordsMatch, isPasswordMinLength, doesUserExist, hashPassword, userController.updateUser)

module.exports = router;