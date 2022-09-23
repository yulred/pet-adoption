const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const { cookieSettings } = require("../config");

async function signupUser(req, res) {
  try {
    const user = await userModel.signupUser(req.body);
    const token = jwt.sign({ id: user._id.toString() }, process.env.TOKEN_KEY, { expiresIn: "14d" });
    
    res.cookie("token", token, cookieSettings);
    res.send({ ok: true, id: user._id.toString() });
  } catch(err) {
    res.status(500).send(err);
  }
}

module.exports = { signupUser };