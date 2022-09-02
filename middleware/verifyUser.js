const userModel = require("../models/userModel");

async function verifyUser(req, res, next) {
  const { id } = req.params;

  if (id === req.body.userID) {
    next();
  } else {
    res.status(401).send("Forbidden");
    return;
  }
}

module.exports = { verifyUser };