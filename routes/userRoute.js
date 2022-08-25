const express = require("express");
const userController = require("../controllers/userController");
const { validateBody } = require("../middleware/validateBody");
const { userSchema } = require("../schemas/userSchema");
const { doPasswordsMatch, isPasswordMinLength, doesUserExist } = require("../middleware/userMiddleware");
const { hashPassword } = require("../middleware/hashPassword");

const router = express.Router();

router
.get("/:id", userController.getUser)
.put("/", validateBody(userSchema), doPasswordsMatch, isPasswordMinLength, doesUserExist, hashPassword, userController.updateUser)

module.exports = router;