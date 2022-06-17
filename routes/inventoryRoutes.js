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

// GETTING ALL INVENTORY ITEMS DATA
router.route("/").get((req, res) => {
  let inventoryItems = readFile();
  return res.status(200).send(inventoryItems);
});

router
  .route("/:inventoryId")
  // GETTING INVENTORY BY THEIR IDS
  .get((req, res) => {
    const inventoryItemId = req.params.inventoryId;
    const inventoryItems = readFile().find(
      (inventoryItem) => inventoryItem.id === inventoryItemId
    );

    // CONDITIONAL FOR URL VALIDATION
    !inventoryItems
      ? res.status(404).send("Item not found")
      : res.status(200).json(inventoryItems);
  });

// GETTING INVENTORY BY WAREHOUSE ID
router.route("/warehouse/:warehouseID").get((req, res) => {
  const inventoryItems = readFile();

  const warehouseInventories = inventoryItems.filter(
    (inventory) => inventory.warehouseID === req.params.warehouseID
  );

  warehouseInventories.length === 0
    ? res.status(404).send("Warehouse inventory not found")
    : res.status(200).json(warehouseInventories);
});

module.exports = router;
