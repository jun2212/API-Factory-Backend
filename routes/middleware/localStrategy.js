const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");

const { findUserData } = require("../services/index.services");

passport.use(
  new LocalStrategy(
    {
      usernameField: "userId",
      passwordField: "password",
    },
    async (userId, password, done) => {
      try {
        const { Item } = await findUserData(userId);

        if (!Item) {
          return done(null, false, { message: "Incorrect Id." });
        }

        const IsCompare = await bcrypt.compare(password, Item.password);

        if (!IsCompare) {
          return done(null, false, { message: "Incorrect Password." });
        }

        return done(null, Item);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.serializeUser(function (user, done) {
  done(null, user.user_id);
});

passport.deserializeUser(async function (userId, done) {
  try {
    const { Item } = await findUserData(userId);

    done(null, Item);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
