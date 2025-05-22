const { Router } = require("express");
const router = Router();
const authentication = require("../middlewares/authentication.js");
const { getShipDetails } = require("../controllers/marine.controller.js");

router.get("/", authentication, getShipDetails);

module.exports = router;
