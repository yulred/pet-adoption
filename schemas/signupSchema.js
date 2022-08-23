const { telRegExpStr } = require("../config");

const signupSchema = {
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
      type: "string",
      minLength: 8,
    },
    passwordConfirm: {
      type: "string",
      minLength: 8,
    },
    tel: {
      anyOf: [ { type: "string", pattern: telRegExpStr, }, { const: "" } ],
    },
  },
  required: ["name", "email", "password", "passwordConfirm"],
}

module.exports = { signupSchema };