const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuid } = require("uuid");
router.use(express.json());

const warehouseDataPath = "./data/warehouses.json";

//FUNCTION TO READ FILE
const readFile = () => {
  return JSON.parse(fs.readFileSync(warehouseDataPath));
};

router
  .route("/")
  .get((req, res) => {
    const warehouseData = readFile();
    return res.status(200).send(warehouseData);
  })

  // HANDLING POST REQUEST FOR CREATING NEW WAREHOUSE
  .post((req, res) => {
    const warehouseData = readFile();

    // CONDITIONAL FOR VALIDATION
    // if (
    //   !req.body.warehouseName ||
    //   !req.body.address ||
    //   !req.body.city ||
    //   !req.body.country ||
    //   !req.body.contactName ||
    //   !req.body.position ||
    //   !req.body.phone ||
    //   !req.body.email
    // ) {
    //   return res.status(400).send("Please provide all information.");
    // }

    // CREATING NEW WAREHOUSE OBJECT
    const newWarehouse = {
      id: uuid(),
      name: req.body.warhouseName,
      addres: req.body.address,
      city: req.body.city,
      country: req.body.country,
      contact: {
        name: req.body.contactName,
        position: req.body.position,
        phone: req.body.number,
        email: req.body.email,
      },
    };

    // PUSHING TO DATA, STRINGIFYING, AND RETURNING NEW OBJECT
    warehouseData.push(newWarehouse);
    fs.writeFileSync(warehouseDataPath, JSON.stringify(warehouseData));
    console.log(newWarehouse);
    res.status(201).json(newWarehouse);
  });

router.route("/:warehouseId").get((req, res) => {
  const warehouseId = req.params.warehouseId;
  const warehouseData = readFile().find(
    (warehouse) => warehouse.id === warehouseId
  );

  if (warehouseData) {
    res.status(200).json(warehouseData);
  } else {
    res.status(404).send("Warehouse not found");
  }
});

module.exports = router;
