const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();


const bp = require('body-parser')


app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))



const inventoryRoutes = require("./routes/inventoryRoutes");
const warehouseRoutes = require("./routes/warehouseRoutes");

dotenv.config();
const PORT = process.env.PORT ?? 8080;
app.use(cors());

app.use(express.json());

// TEST
app.get("/", function (req, res) {
  console.log(req);
  res.send("Welcome to inStock API!");
});

// ROUTES
app.use("/inventory", inventoryRoutes);
app.use("/warehouse", warehouseRoutes);

// LISTEN
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
