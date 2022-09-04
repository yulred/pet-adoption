async function verifyUser(req, res, next) {
  const { id } = req.params;

  if (id === req.body.userID) {
    next();
  } else {
    res.status(403).send("You don't have permission to access this resource.");
    return;
  }
}

module.exports = { verifyUser };