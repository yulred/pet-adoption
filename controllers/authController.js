async function authenticateUser(req, res) {
  try {
    res.send({ ok: true, id: req.body.userID });
  } catch(err) {
    res.status(500).send(err);
  }
}

module.exports = { authenticateUser };