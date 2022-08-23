const express = require("express");
const userController = require("../controllers/userController");
const { validateBody } = require("../middleware/validateBody");
const { userSchema } = require("../schemas/userSchema");

const router = express.Router();

router.get("/:id", userController.getUser);

router.put("/", validateBody(userSchema), userController.updateUser);

module.exports = router;