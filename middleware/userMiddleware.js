const { userModel } = require("../models/userModel");

function doPasswordsMatch(req, res, next) {
  if (req.body.password) {
    if (req.body.password === req.body.passwordConfirm) {
      delete req.body.passwordConfirm;
      next();
    }
    else res.status(400).send("Passwords must match.");
  } else next();
}

function isPasswordMinLength(req, res, next) {
  if (req.body.password) {
    if (req.body.password.length >= 8) next();
    else res.status(400).send("Password must be at least 8 characters.");
  } else next();
}

async function doesUserExist(req, res, next) {
  try {
    if (req.body.email) {
      const isUser = await userModel.exists({ email: req.body.email });

      if (!isUser || req.body.userID === isUser._id.toString()) next();
      else res.status(400).send("E-Mail already registered.");
    } else next();
  } catch(err) {
    console.log(err);
  }
}

module.exports = { doPasswordsMatch, isPasswordMinLength, doesUserExist };