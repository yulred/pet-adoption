const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8080;

const usersRoute = require("./routes/usersRoute");
const petsRoute = require("./routes/petsRoute");

mongoose.connect(process.env.MONGO_URI, () => console.log("Connected to DB"), err => console.log(err));

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", usersRoute);
app.use("/pet", petsRoute);

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
})