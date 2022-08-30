const loginModel = require("../models/loginModel");

async function loginUser(req, res) {
  try {
    const token = await loginModel.loginUser(res.locals.userID);

    res.cookie("token", token, { maxAge: 1209600000, httpOnly: true, sameSite: "none", overwrite: true });
    res.send({ ok: true, id: res.locals.userID });
  } catch(err) {
    res.status(500).send(err);
  }
}

module.exports = { loginUser };