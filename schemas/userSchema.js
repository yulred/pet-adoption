const { telRegExpStr } = require("../config");

const userSchema = {
  type: "object",
  properties: {
    name: { 
      type: "string",
      minLength: 2,
    },
    email: {
      type: "string",
      format: "email",
    },
    password: {
      anyOf: [ { type: "string", minLength: 8 }, { const: "" } ],
    },
    passwordConfirm: {
      anyOf: [ { type: "string", minLength: 8 }, { const: "" } ],
    },
    tel: {
      anyOf: [ { type: "string", pattern: telRegExpStr, }, { const: "" } ],
    },
    bio: {
      type: "string",
      maxLength: 350,
    },
  },
}

module.exports = { userSchema };