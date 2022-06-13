const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const inventoryRoutes = require("./routes/inventoryRoutes");
const warehouseRoutes = require("./routes/warehouseRoutes");

dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 8080;
app.use(cors());

// TEST
app.get("/", function (req, res) {
  res.send("Welcome to inStock API!");
});

// ROUTES
app.use("/inventory", inventoryRoutes);
app.use("/warehouse", warehouseRoutes);

// LISTEN
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
