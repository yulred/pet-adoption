function imageUrl(req, res, next) {
  try {
    if (req.file) {
      const url = `http://localhost:8080/${req.file.path}`;
      req.body.imageUrl = url;
      next();
    }
    else next();
  } catch(err) {
    res.status(500).send(err);
  }
}

module.exports = { imageUrl };