const catchAsync = require("../../utils/catchAsync");
const { findUserData, registerUser } = require("../services/index.services");
const passport = require("../middleware/localStrategy");

const rootMessage = catchAsync((req, res) => {
  res.status(200).json("root");
});

const login = catchAsync((req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      return next(error);
    }
    if (info) {
      return res.status(400).json(info.message);
    }

    return req.login(user, (error) => {
      if (error) {
        return next(error);
      }

      res.status(200).json("Login success");
    });
  })(req, res, next);
});

const register = catchAsync(async (req, res) => {
  const response = await findUserData(req.body.userId);

  if (response.Item) {
    return res.status(400).json("The ID already exists");
  }

  await registerUser(req.body);

  res.status(200).json("Register success");
});

const logout = (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    res.status(200).json("Logout success");
  });
};

const isLoggedIn = catchAsync((req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json(true);
  }

  return res.status(403).json(false);
});

module.exports = { rootMessage, login, register, logout, isLoggedIn };
