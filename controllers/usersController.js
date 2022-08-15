async function getAllUsers(req, res) {
  try {
    res.send("test");
  } catch(err) {
    res.sendStatus(500).send(err);
  }
}

module.exports = {getAllUsers};