const express = require("express");
const router = express.Router();

const {
  rootMessage,
  login,
  register,
  logout,
  isLoggedIn,
} = require("./controller/index.controller");

router
  .get("/", rootMessage)
  .post("/login", login)
  .post("/register", register)
  .post("/logout", logout)
  .post("/isLoggedIn", isLoggedIn);

module.exports = router;
