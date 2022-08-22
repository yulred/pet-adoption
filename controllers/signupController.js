const signupModel = require("../models/signupModel");

async function signupUser(req, res) {
  try {
    const newUser = await signupModel.signupUser(req.body);
    res.send(newUser);
  } catch(err) {
    res.status(500).send(err);
  }
}

module.exports = { signupUser };