const { Router } = require("express");
const router = Router();
const authentication = require("../middlewares/authentication.js");
const { getShipDetails } = require("../controllers/marine.controller.js");

router.get("/:name", authentication, getShipDetails);

module.exports = router;
