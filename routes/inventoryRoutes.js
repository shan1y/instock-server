const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuid } = require("uuid");

const inventoryDataPath = "./data/inventories.json";

// For post request id reference
const warehouseDataPath = "./data/warehouses.json";

const readWarehouseFile = () => {
  return JSON.parse(fs.readFileSync(warehouseDataPath));
};

//FUNCTION TO READ FILE
const readFile = () => {
  return JSON.parse(fs.readFileSync(inventoryDataPath));
};

// GETTING ALL INVENTORY ITEMS DATA
router
  .route("/")
  .get((_req, res) => {
    let inventoryItems = readFile();
    return res.status(200).send(inventoryItems);
  })
  .post((req, res) => {
    let newInventoryItems = readFile();
    // Read warehouse.json in order to get our warehouse name
    let warehouseRead = readWarehouseFile();
    let pullName = warehouseRead.find((item) => {
      return item.id === req.body.warehouseID;
    });
    // New item object
    let newItem = {
      id: uuid(),
      warehouseID: req.body.warehouseID,
      warehouseName: pullName.name,
      itemName: req.body.itemName,
      description: req.body.description,
      category: req.body.category,
      status: req.body.status,
      quantity: req.body.quantity,
    };

    newInventoryItems.push(newItem);
    fs.writeFileSync(inventoryDataPath, JSON.stringify(newInventoryItems));
    res.status(200).json(newItem);
  });

router
  .route("/:inventoryId")
  // GETTING INVENTORY BY THEIR IDS
  .get((req, res) => {
    const inventoryItemId = req.params.inventoryId;
    const inventoryItems = readWarehouseFile().find(
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
