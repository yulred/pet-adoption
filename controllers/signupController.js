const signupModel = require("../models/signupModel");

async function signupUser(req, res) {
  try {
    const { token, user } = await signupModel.signupUser(req.body);
    
    res.cookie("token", token, { maxAge: 1209600000, httpOnly: false, overwrite: true });
    res.send({ ok: true, id: user._id.toString() });
  } catch(err) {
    res.status(500).send(err);
  }
}

module.exports = { signupUser };