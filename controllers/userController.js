const userModel = require("../models/userModel");

async function getUser(req, res) {
  try {
    const { id } = req.params;
    const user = await userModel.getUser(id);
    res.send(user);
  } catch(err) {
    res.status(500).send(err);
  }
}

async function updateUser(req, res) {
  try {
    const user = await userModel.updateUser(req.body);
    res.send(user);
  } catch(err) {
    res.status(500).send(err);
  }
}

module.exports = { getUser, updateUser };