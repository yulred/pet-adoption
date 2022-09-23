const bcrypt = require("bcrypt");
const { userModel } = require("../models/userModel");

async function doesEmailExist(req, res, next) {
  try {
    const userID = await userModel.exists({ email: req.body.email });

    if (userID) {
      res.locals.userID = userID._id.toString();
      next();
    } else res.status(404).send("User with this E-Mail does not exist.");
  } catch(err) {
    console.log(err);
  }
}

async function validatePassword(req, res, next) {
  try {
    const user = await userModel.findById(res.locals.userID);
    const hashedPassword = user.password;
  
    bcrypt.compare(req.body.password, hashedPassword, (err, match) => {
      if (match) next();
      else res.status(400).send("Wrong password.");
    })
  } catch(err) {
    console.log(err);
  }
}

module.exports = { doesEmailExist, validatePassword };