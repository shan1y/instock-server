const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuid } = require("uuid");

const warehouseData = "./data/warehouse.json";

router.route("/").get((req, res) => {
  res.send("test from warehouse");
});

router.use(express.json());

module.exports = router;
