const jwt = require("jsonwebtoken");
const { cookieSettings } = require("../config");

async function loginUser(req, res) {
  try {
    const token = jwt.sign({ id: res.locals.userID }, process.env.TOKEN_KEY, { expiresIn: "14d" });

    res.cookie("token", token, cookieSettings);
    res.send({ ok: true, id: res.locals.userID });
  } catch(err) {
    res.status(500).send(err);
  }
}

module.exports = { loginUser };