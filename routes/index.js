const express = require("express");
const router = express.Router();

const {
  login,
  register,
  logout,
  isLoggedIn,
} = require("../controller/index.controller");

router.post("/login", login);

router.post("/register", register);

router.post("/logout", logout);

router.post("/isLogin", isLoggedIn);

module.exports = router;
