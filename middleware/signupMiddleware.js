const { userModel } = require("../models/userModel");

function doPasswordsMatch(req, res, next) {
  try {
    if (req.body.password === req.body.passwordConfirm) {
      delete req.body.passwordConfirm;
      next();
    } else res.status(400).send("Passwords must match.");
  } catch(err) {
    console.log(err);
  }
}

function isPasswordMinLength(req, res, next) {
  try {
    if (req.body.password.length >= 8) next();
    else res.status(400).send("Password must be at least 8 characters.");
  } catch(err) {
    console.log(err);
  }
}

async function doesUserExist(req, res, next) {
  try {
    const isUser = await userModel.exists({ email: req.body.email });

    if (!isUser) next();
    else res.status(409).send("User already exists.");
  } catch(err) {
    console.log(err);
  }
}

async function prepFields(req, res, next) {
  try {
    req.body.email = req.body.email.toLowerCase();
    req.body.bio = "";
    req.body.role = "User";
    req.body.pets = {
      adopted: [],
      fostered: [],
      saved: [],
    }

    next();
  } catch(err) {
    console.log(err);
  }
}

module.exports = { doPasswordsMatch, isPasswordMinLength, doesUserExist, prepFields };