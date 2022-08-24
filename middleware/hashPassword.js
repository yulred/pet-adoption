const bcrypt = require("bcrypt");
const saltRounds = 10;

function hashPassword(req, res, next) {
  try {
    if (req.body.password) {
      bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
        req.body.password = hash;
        next();
      })
    } else next();
  } catch(err) {
    console.log(err);
  }
}

module.exports = { hashPassword };