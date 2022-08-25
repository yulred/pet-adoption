const loginModel = require("../models/loginModel");

async function loginUser(req, res) {
  try {
    const token = await loginModel.loginUser(res.locals.userID);

    res.cookie("PetAdoption", token, { maxAge: 1209600000, httpOnly: false, overwrite: true });
    res.send({ ok: true });
  } catch(err) {
    res.status(500).send(err);
  }
}

module.exports = { loginUser };