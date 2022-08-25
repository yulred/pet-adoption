const signupModel = require("../models/signupModel");

async function signupUser(req, res) {
  try {
    const token = await signupModel.signupUser(req.body);
    
    res.cookie("PetAdoption", token, { maxAge: 1209600000, httpOnly: false, overwrite: true });
    res.send({ ok: true });
  } catch(err) {
    res.status(500).send(err);
  }
}

module.exports = { signupUser };