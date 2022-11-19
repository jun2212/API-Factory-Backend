const express = require("express");
const router = express.Router();

const { insertFunction } = require("../controller/saveFunction.controller");

router.post("/", insertFunction);

module.exports = router;
