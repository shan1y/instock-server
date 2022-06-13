const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuid } = require("uuid");

router.use(express.json());

const inventoryData = "./data/inventories.json";

router.route("/").get((req, res) => {
  res.send("test from inventory");
});

module.exports = router;
