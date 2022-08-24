const express = require("express");
const userController = require("../controllers/userController");
const { validateBody } = require("../middleware/validateBody");
const { userSchema } = require("../schemas/userSchema");
const { doPasswordsMatch, isPasswordMinLength, isExistingUser } = require("../middleware/userMiddleware");
const { hashPassword } = require("../middleware/hashPassword");

const router = express.Router();

router.get("/:id", userController.getUser);

router.put("/", validateBody(userSchema), doPasswordsMatch, isPasswordMinLength, isExistingUser, hashPassword, userController.updateUser);

module.exports = router;