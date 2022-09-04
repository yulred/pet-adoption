const userModel = require("../models/userModel");

async function verifyAdmin(req, res, next) {
  const user = await userModel.userModel.findById(req.body.userID);

  if (user.role === "Admin") {
    next();
  } else {
    res.status(403).send("You don't have permission to access this resource.");
    return;
  }
}

module.exports = { verifyAdmin };