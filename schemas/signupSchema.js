const mongoose = require("mongoose");

const signupSchemaAjv = {
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
      anyOf: [ { type: "string", pattern: "^((\\+[1-9]{1,4}[\\-]*)|(\\([0-9]{2,3}\\)[\\-]*)|([0-9]{2,4})[\\-]*)*?[0-9]{3,4}?[\\-]*[0-9]{3,4}?$", }, { const: "" } ],
    },
  },
  required: ["name", "email", "password", "passwordConfirm"],
}

const signupSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid e-mail."],
  },
  password: {
    type: String,
    minLength: 8,
    required: true,
  },
  tel: {
    type: String,
    match: [/^((\\+[1-9]{1,4}[\\-]*)|(\\([0-9]{2,3}\\)[\\-]*)|([0-9]{2,4})[\\-]*)*?[0-9]{3,4}?[\\-]*[0-9]{3,4}?$/, "Invalid phone number."],
  },
},
{ timestamps: true })

module.exports = { signupSchemaAjv, signupSchema };