const createError = require("http-errors");
const express = require("express");
const expressSession = require("express-session");

const passport = require("./middleware/localStrategy");
const index = require("./routes/index");
const functionData = require("./routes/functionData");

const app = express();

const cors = require("cors");

app.use(cors({ origin: process.env.FRONT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  expressSession({
    secret: process.env.SECRET,
    sameSite: "None",
    domain: ".api-factory.live",
    resave: true,
    saveUninitialized: true,
    proxy: true,
    cookie: { secure: false, httpOnly: false },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", index);
app.use("/functionData", functionData);

app.use(function (req, res, next) {
  next(createError(404, "404 Not Found"));
});

app.use(function (error, req, res, next) {
  res.locals.message = error.message;
  res.locals.error = req.app.get("env") === "development" ? error : {};

  res.status(error.status || 500).json(error.message);
});

module.exports = app;
