const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {
  const { token } = req.cookies;

  if (!token) return res.end();

  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) {
      res.clearCookie("token", { httpOnly: true });
      res.status(401).send("Invalid Token");
      return;
    }

    req.body.userID = decoded.id;
    next();
  })
}

module.exports = { verifyToken };