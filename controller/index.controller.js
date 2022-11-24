const catchAsync = require("../utils/catchAsync");
const { findUserData, registerUser } = require("../services/index.services");
const passport = require("../middleware/localStrategy");

const rootMessage = catchAsync(async (req, res, next) => {
  res.status(200).json("root");
});

const login = catchAsync(async (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      return next(error);
    }
    if (info) {
      return res.status(400).json(info.message);
    }

    return req.login(user, async (error) => {
      console.log("login", user);
      if (error) {
        return next(error);
      }

      res.status(200).json("Login success");
    });
  })(req, res, next);
});

const register = catchAsync(async (req, res, next) => {
  const response = await findUserData(req.body.userId);

  if (response.Item) {
    return res.status(400).json("The ID already exists");
  }

  await registerUser(req.body);

  res.status(200).json("Register success");
});

const logout = async (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    res.status(200).json("Logout success");
  });
};

const isLoggedIn = catchAsync(async (req, res, next) => {
  console.log("isLoggedIn", req);
  if (req.isAuthenticated()) {
    return res.status(200).json(true);
  }

  return res.status(403).json(false);
});

module.exports = { rootMessage, login, register, logout, isLoggedIn };
