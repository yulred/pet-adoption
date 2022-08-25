const Ajv = require("ajv");
const ajv = new Ajv({allErrors: true});
const addFormats = require("ajv-formats");
addFormats(ajv);
require("ajv-errors")(ajv);

function validateBody(schema) {
  return (req, res, next) => {
    const valid = ajv.validate(schema, req.body);
    if (!valid) {
      console.log(ajv.errors);
      res.status(400).send(ajv.errors[0].message);
      return;
    }
    next();
  }
}

module.exports = { validateBody };