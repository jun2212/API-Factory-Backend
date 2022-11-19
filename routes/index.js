const express = require("express");
const router = express.Router();

const {
  login,
  register,
  logout,
  isLoggedIn,
} = require("../controller/index.controller");

router
  .post("/login", login)
  .post("/register", register)
  .post("/logout", logout)
  .post("/isLogin", isLoggedIn);

module.exports = router;
