const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuid } = require("uuid");
router.use(express.json());

const warehouseDataPath = "./data/warehouses.json";
const inventoryDataPath = "./data/inventories.json";

//FUNCTION TO READ FILE
const readFile = (data) => {
  return JSON.parse(fs.readFileSync(data));
};

router
  .route("/")
  // GETTING ALL WAREHOUSE DATA
  .get((req, res) => {
    const warehouseData = readFile(warehouseDataPath);
    return res.status(200).send(warehouseData);
  })

  // HANDLING POST REQUEST FOR CREATING NEW WAREHOUSE
  .post((req, res) => {
    const warehouseData = readFile(warehouseDataPath);

    // CONDITIONAL FOR BACK END POST VALIDATION

    // THIS NEEDS TO BE PUT INTO A FUNCTION LATER FOR DRY-ER CODE
    if (
      !req.body.warehouseName ||
      !req.body.address ||
      !req.body.city ||
      !req.body.country ||
      !req.body.contactName ||
      !req.body.position ||
      !req.body.phone ||
      !req.body.email
    ) {
      return res.status(400).send("Please provide all information.");
    }

    // CREATING NEW WAREHOUSE OBJECT
    const newWarehouse = {
      id: uuid(),
      name: req.body.warehouseName,
      address: req.body.address,
      city: req.body.city,
      country: req.body.country,
      contact: {
        name: req.body.contactName,
        position: req.body.position,
        phone: req.body.phone,
        email: req.body.email,
      },
    };

    // PUSHING TO DATA, STRINGIFYING, AND RETURNING NEW OBJECT
    warehouseData.push(newWarehouse);
    fs.writeFileSync(warehouseDataPath, JSON.stringify(warehouseData));
    console.log(newWarehouse);
    res.status(201).json(newWarehouse);
  });

router
  .route("/:warehouseId")
  // GETTING WAREHOUSE BY THEIR IDS
  .get((req, res) => {
    const warehouseId = req.params.warehouseId;
    const warehouseData = readFile(warehouseDataPath).find(
      (warehouse) => warehouse.id === warehouseId
    );
    // CONDITIONAL FOR URL VALIDATION
    !warehouseData
      ? res.status(404).send("Warehouse not found")
      : res.status(200).json(warehouseData);
  });

router
.route("/:warehouseId/edit").put((req, res) => {
  let warehouseList = readFile(warehouseDataPath);
  let warehouseId = req.params.warehouseId;
  let warehouseIndex = warehouseList.findIndex(
    (warehouse) => warehouse.id === warehouseId
  );

  warehouseList[warehouseIndex] = {
    id: req.body.id,
    name: req.body.warehouseName,
    address: req.body.address,
    city: req.body.city,
    country: req.body.country,
    contact: {
      name: req.body.contactName,
      position: req.body.position,
      phone: req.body.phone,
      email: req.body.email,
    },
  };

  fs.writeFileSync(warehouseDataPath, JSON.stringify(warehouseList));
  res.json(warehouseList);
});

router.route("/:id").delete((req, res) => {
  const warehouseData = readFile(warehouseDataPath);
  const newWarehouseList = warehouseData.filter((warehouse) => {
    return warehouse.id !== req.params.id;
  });

  fs.writeFileSync(warehouseDataPath, JSON.stringify(newWarehouseList));
  res.status(200).json(newWarehouseList);
});

// GETTING INVENTORY BY WAREHOUSE ID // /warehouse/:warehouseId/inventory
router.route("/:warehouseID/inventory").get((req, res) => {
  const inventoryItems = readFile(inventoryDataPath);

  const warehouseInventories = inventoryItems.filter(
    (inventory) => inventory.warehouseID === req.params.warehouseID
  );

  warehouseInventories.length === 0
    ? res.status(404).send("Warehouse inventory not found")
    : res.status(200).json(warehouseInventories);
});

module.exports = router;
