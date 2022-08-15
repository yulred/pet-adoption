const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 8080;

const usersRoute = require("./routes/usersRoute");
const petsRoute = require("./routes/petsRoute");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", usersRoute);
app.use("/pet", petsRoute);

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT + ".");
})