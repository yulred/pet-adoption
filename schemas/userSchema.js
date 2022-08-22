const mongoose = require("mongoose");

const userSchemaAjv = {
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
      anyOf: [ { type: "string", pattern: "^((\\+[1-9]{1,4}[\\-]*)|(\\([0-9]{2,3}\\)[\\-]*)|([0-9]{2,4})[\\-]*)*?[0-9]{3,4}?[\\-]*[0-9]{3,4}?$", }, { const: "" } ],
    },
    bio: {
      type: "string",
      maxLength: 350,
    },
  },
  required: ["password"]
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
  },
  email: {
    type: String,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid e-mail."],
  },
  password: {
    type: String,
    minLength: 8,
  },
  tel: {
    type: String,
    match: [/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, "Invalid phone number."],
  },
  bio: {
    type: String,
    maxLength: 350,
  },
},
{ timestamps: true })

module.exports = { userSchemaAjv, userSchema };