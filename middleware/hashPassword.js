const bcrypt = require("bcrypt");
const saltRounds = 10;

function hashPassword(req, res, next) {
  try {
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      req.body.password = hash;
      next();
    })
  } catch(err) {
    console.log(err);
  }
}

module.exports = { hashPassword };