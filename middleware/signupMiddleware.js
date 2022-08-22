const { signupModel } = require("../models/signupModel");

function doPasswordsMatch(req, res, next) {
  if (req.body.password === req.body.passwordConfirm) {
    delete req.body.passwordConfirm;
    next();
  } else res.status(400).send("Passwords must match.");
}

function isPasswordMinLength(req, res, next) {
  if (req.body.password.length >= 8) next();
  else res.status(400).send("Password must be at least 8 characters.");
}

async function isExistingUser(req, res, next) {
  try {
    const isUser = await signupModel.exists({ email: req.body.email });

    if (!isUser) next();
    else res.status(400).send("User already exists.");
  } catch(err) {
    console.log(err);
  }
}

module.exports = { doPasswordsMatch, isPasswordMinLength, isExistingUser };