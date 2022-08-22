const bcrypt = require("bcrypt");
const { loginModel } = require("../models/loginModel");

async function isExistingEmail(req, res, next) {
  try {
    const userID = await loginModel.exists({ email: req.body.email });

    if (userID) {
      res.locals.userID = userID;
      next();
    }
    else res.status(400).send("User with this E-Mail does not exist.");
  } catch(err) {
    console.log(err);
  }
}

async function isCorrectPassword(req, res, next) {
  try {
    const user = await loginModel.findById(res.locals.userID);
    const hashedPassword = user.password;
  
    bcrypt.compare(req.body.password, hashedPassword, (err, match) => {
      if (match) next();
      else res.status(400).send("Wrong password.");
    })
  } catch(err) {
    console.log(err);
  }
}

module.exports = { isExistingEmail, isCorrectPassword };