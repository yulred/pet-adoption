function imageUrl(req, res, next) {
  try {
    const url = `http://localhost:8080/${req.file.path}`;
    req.body.imageUrl = url;
    next();
  } catch(err) {
    res.status(500).send(err);
  }
}

module.exports = { imageUrl };