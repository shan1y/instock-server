const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuid } = require("uuid");

router.use(express.json());

const inventoryDataPath = "./data/inventories.json";

//FUNCTION TO READ FILE
const readFile = () => {
  return JSON.parse(fs.readFileSync(inventoryDataPath));
};

router.route("/").get((req, res) => {
  let inventoryData = readFile();
  return res.status(200).send(inventoryData);
});

module.exports = router;
