const express = require("express");
const router = express.Router();

const {
  insertFunction,
  getUserFunctions,
  getSelectedFunction,
  updateFunction,
  deleteFunction,
} = require("./controller/functionData.controller");

router
  .get("/", getUserFunctions)
  .get("/:functionKey", getSelectedFunction)
  .post("/", insertFunction)
  .put("/", updateFunction)
  .delete("/:functionKey", deleteFunction);

module.exports = router;
