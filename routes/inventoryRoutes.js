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
router
  .route("/")
  .get((req, res) => {
    let inventoryItems = readFile();
    return res.status(200).send(inventoryItems);
  })
  // POST REQUEST FOR addInventoryItems component
  .post((res, req) => {
    const { warehouseName, itemName, description, category, status, quantity } =
      req.body;
      let newInventoryItems = readFile();

    const newItem = {
      id: uuid(),
      warehouseID: uuid(),
      warehouseName: warehouseName,
      itemName: itemName,
      description: description,
      category: category,
      status: status,
      quantity: quantity,
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
    const inventoryItems = readFile().find(
      (inventoryItem) => inventoryItem.id === inventoryItemId
    );

    // CONDITIONAL FOR URL VALIDATION
    !inventoryItems
      ? res.status(404).send("Item not found")
      : res.status(200).json(inventoryItems);
  });

module.exports = router;
