const logoutModel = require("../models/logoutModel");

async function logoutUser(req, res) {
  try {
    const name = Object.keys(req.body);

    await logoutModel.logoutUser(req.body);

    res.clearCookie(name[0], { httpOnly: false });
    res.send({ ok: true });
  } catch(err) {
    res.status(500).send(err);
  }
}

module.exports = { logoutUser };