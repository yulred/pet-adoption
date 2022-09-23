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
    res.send({ok: true});
  } catch(err) {
    res.status(500).send(err);
  }
}

async function getFullUser(req, res) {
  try {
    const { id } = req.params;
    const user = await userModel.getFullUser(id);
    res.send(user);
  } catch(err) {
    res.status(500).send(err);
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await userModel.getAllUsers();
    res.send(users);
  } catch(err) {
    res.status(500).send(err);
  }
}

async function getSearchedUsers(req, res) {
  try {
    const users = await userModel.getSearchedUsers(req.query);
    res.send(users);
  } catch(err) {
    res.status(500).send(err);
  }
}

module.exports = { getUser, updateUser, getFullUser, getAllUsers, getSearchedUsers };