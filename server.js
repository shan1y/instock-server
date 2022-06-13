const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 8080;

app.get("/", function (req, res) {
  res.send("Welcome to inStock API!");
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
