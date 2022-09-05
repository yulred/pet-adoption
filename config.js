const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const telRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const telRegExpStr = "^((\\+[1-9]{1,4}[\\-]*)|(\\([0-9]{2,3}\\)[\\-]*)|([0-9]{2,4})[\\-]*)*?[0-9]{3,4}?[\\-]*[0-9]{3,4}?$";

const cookieSettings = { maxAge: 1209600000, httpOnly: false, overwrite: true };

const dev = { API_URL: "http://localhost:3000" };
const prod = { API_URL: "https://tranquil-everglades-31307.herokuapp.com/" };

const config = process.env.NODE_ENV === "development" ? dev : prod;

module.exports = { emailRegExp, telRegExp, telRegExpStr, cookieSettings, config };