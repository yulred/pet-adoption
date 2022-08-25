async function logoutUser(req, res) {
  try {
    const name = Object.keys(req.body);

    res.clearCookie(name[0], { httpOnly: true });
    res.send({ ok: true });
  } catch(err) {
    res.status(500).send(err);
  }
}

module.exports = { logoutUser };