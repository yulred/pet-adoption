const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const { config } = require("./config");

const authRoute = require("./routes/authRoute");
const petRoute = require("./routes/petRoute");
const signupRoute = require("./routes/signupRoute");
const loginRoute = require("./routes/loginRoute");
const logoutRoute = require("./routes/logoutRoute");
const userRoute = require("./routes/userRoute");

const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URI, () => console.log("Connected to DB"), err => console.log(err));

app.use("/images", express.static("images"));
app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: config, credentials: true }));

app.use("/pet", petRoute);
app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/logout", logoutRoute);
app.use("/user", userRoute);
app.use("/", authRoute);

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
})