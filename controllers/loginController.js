const loginModel = require("../models/loginModel");

async function loginUser(req, res) {
  try {
    const authToken = await loginModel.loginUser(res.locals.userID);

    res.cookie("PetAdoption", `${authToken.user}%${authToken.token}`, { maxAge: 172800000, httpOnly: false, overwrite: true });
    res.send({ ok: true });
  } catch(err) {
    res.status(500).send(err);
  }
}

module.exports = { loginUser };