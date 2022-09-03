const { userModel } = require("./userModel");

async function signupUser(newUser) {
  try {
    const user = await userModel.create(newUser);
    return user;
  } catch(err) {
    console.log(err);
  }
}

module.exports = { signupUser };