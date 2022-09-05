const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const telRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const telRegExpStr = "^((\\+[1-9]{1,4}[\\-]*)|(\\([0-9]{2,3}\\)[\\-]*)|([0-9]{2,4})[\\-]*)*?[0-9]{3,4}?[\\-]*[0-9]{3,4}?$";

const cookieSettings = { maxAge: 1209600000, httpOnly: false, overwrite: true };

const config = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://pet-adoption-yulred.netlify.app";

module.exports = { emailRegExp, telRegExp, telRegExpStr, cookieSettings, config };