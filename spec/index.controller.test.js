const passport = require("../routes/middleware/localStrategy");
const {
  rootMessage,
  login,
  register,
  logout,
  isLoggedIn,
} = require("../routes/controller/index.controller");
const {
  findUserData,
  registerUser,
} = require("../routes/services/index.services");

jest.mock("../routes/services/index.services");

describe("index.controller", () => {
  const err = new Error("mockError");

  beforeEach(() => {
    req = {
      body: {
        userId: "mockID",
      },
    };
    res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    };
    next = jest.fn();
  });

  describe("rootMessage", () => {
    it("status = 200 body = 'root'", () => {
      rootMessage(req, res);

      expect(res.status).toBeCalledWith(200);
      expect(res.status).toBeCalledTimes(1);
      expect(res.json).toBeCalledWith("root");
      expect(res.json).toBeCalledTimes(1);
    });
  });

  describe("login", () => {
    it("error가 발생하면 error를 파라미터로 한 next를 호출해야 한다.", () => {
      passport.authenticate = jest.fn(
        (str, func) => (req, res, next) => func(err),
      );

      login(req, res, next);

      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith(err);
    });

    it("info가 있으면 status = 400, json = info.message", () => {
      const info = { message: "mockMessage" };

      passport.authenticate = jest.fn(
        (str, func) => (req, res, next) => func(null, null, info),
      );

      login(req, res, next);

      expect(res.status).toBeCalledWith(400);
      expect(res.status).toBeCalledTimes(1);
      expect(res.json).toBeCalledWith("mockMessage");
      expect(res.json).toBeCalledTimes(1);
    });

    it("user만 있으면 req.login이 호출되어야 한다.", () => {
      passport.authenticate = jest.fn(
        (str, func) => (req, res, next) => func(null, "user", null),
      );
      req = {
        login: jest.fn(),
      };

      login(req, res, next);

      expect(req.login).toBeCalledTimes(1);
    });
  });

  describe("register", () => {
    it("입력한 아이디가 DB에 존재하면 status = 400, json = 'The ID already exists'", async () => {
      findUserData.mockReturnValue(
        Promise.resolve({
          Item: true,
        }),
      );

      await register(req, res);

      expect(findUserData).toBeCalledWith(req.body.userId);
      expect(findUserData).toBeCalledTimes(1);
      expect(res.status).toBeCalledWith(400);
      expect(res.status).toBeCalledTimes(1);
      expect(res.json).toBeCalledWith("The ID already exists");
      expect(res.json).toBeCalledTimes(1);
    });

    it("입력한 아이디가 DB에 존재하지 않으면, req.body를 파라미터로 한 registerUser 호출하고 status = 200, json = 'Register success'", async () => {
      findUserData.mockClear();

      findUserData.mockReturnValue(
        Promise.resolve({
          Item: false,
        }),
      );

      await register(req, res);

      expect(findUserData).toBeCalledWith(req.body.userId);
      expect(findUserData).toBeCalledTimes(1);
      expect(registerUser).toBeCalledWith(req.body);
      expect(registerUser).toBeCalledTimes(1);
      expect(res.status).toBeCalledWith(200);
      expect(res.status).toBeCalledTimes(1);
      expect(res.json).toBeCalledWith("Register success");
      expect(res.json).toBeCalledTimes(1);
    });
  });

  describe("logout", () => {
    it("req.logout 함수를 호출해야 한다.", () => {
      req = {
        logout: jest.fn(),
      };

      logout(req, res, next);

      expect(req.logout).toBeCalledTimes(1);
    });
  });

  describe("isLoggedIn", () => {
    it("로그인 되어있으면 status = 200, json = true", async () => {
      req = {
        isAuthenticated: jest.fn(() => true),
      };

      await isLoggedIn(req, res, next);

      expect(res.status).toBeCalledWith(200);
      expect(res.status).toBeCalledTimes(1);
      expect(res.json).toBeCalledWith(true);
      expect(res.json).toBeCalledTimes(1);
    });

    it("로그인 안 되어있으면 status = 403, json = false", async () => {
      req = {
        isAuthenticated: jest.fn(() => false),
      };

      await isLoggedIn(req, res);

      expect(res.status).toBeCalledWith(403);
      expect(res.status).toBeCalledTimes(1);
      expect(res.json).toBeCalledWith(false);
      expect(res.json).toBeCalledTimes(1);
    });
  });
});
