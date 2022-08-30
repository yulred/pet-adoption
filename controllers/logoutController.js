async function logoutUser(req, res) {
  try {
    res.clearCookie("token", { httpOnly: true });
    res.send({ ok: true });
  } catch(err) {
    res.status(500).send(err);
  }
}

module.exports = { logoutUser };