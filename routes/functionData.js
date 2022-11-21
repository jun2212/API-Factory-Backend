const express = require("express");
const router = express.Router();

const {
  insertFunction,
  getUserFunctions,
  updateFunction,
  deleteFunction,
} = require("../controller/functionData.controller");

router
  .get("/", getUserFunctions)
  .post("/", insertFunction)
  .put("/", updateFunction)
  .delete("/:functionKey", deleteFunction);

module.exports = router;
