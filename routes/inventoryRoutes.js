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
  const inventoryItemToEdit = inventoryItems.find(
    (item) => item.id === req.params.id
  );
  if (inventoryItemToEdit) {
    let inventoryItemToEdit = {
      id: inventoryItemToEdit.id,
      warehouseID: req.body.warehouseID,
      warehouseName: req.body.warehouseName,
      itemName: req.body.itemName,
      description: req.body.description,
      category: req.body.category,
      status: req.body.status,
      quantity: 298,
    };
  }
  fs.writeFileSync(inventoryDataPath, JSON.stringify(inventoryItemToEdit));
});

module.exports = router;
