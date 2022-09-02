const userModel = require("../models/userModel");

async function verifyAdmin(req, res, next) {
  const user = await userModel.userModel.findById(req.body.userID);

  if (user.role === "Admin") {
    next();
  } else {
    res.status(401).send("Forbidden");
    return;
  }
}

module.exports = { verifyAdmin };