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

router.route("/:inventoryId/edit").put((req, res) => {
  let inventoryItems = readFile();
  let index = inventoryItems.findIndex(
    (item) => item.id === req.params.inventoryId
  );

  console.log(index);

  (inventoryItems[index]["id"] = req.body.id),
    (inventoryItems[index]["warehouseID"] = req.body.warehouseID),
    (inventoryItems[index]["warehouseName"] = req.body.warehouseName),
    (inventoryItems[index]["itemName"] = req.body.itemName),
    (inventoryItems[index]["description"] = req.body.description),
    (inventoryItems[index]["category"] = req.body.category),
    (inventoryItems[index]["status"] = req.body.status),
    (inventoryItems[index]["quantity"] = req.body.quantity),
    console.log(inventoryItems[index]);
  fs.writeFileSync(inventoryDataPath, JSON.stringify(inventoryItems));
  res.json(inventoryItems);
});

module.exports = router;
