const uuid = require("../utils/uuidUtil");
const bcyrpt = require("bcrypt");

const {
  findUserData,
  registerUser,
} = require("../routes/services/index.services");

const dynamoDB = require("../utils/dynamoDbUtil");

jest.mock("../utils/uuidUtil", () =>
  jest.fn().mockImplementation(() => "mockKey"),
);
jest.mock("bcrypt");
jest.mock("../utils/dynamoDbUtil");

describe("functionData.controller", () => {
  const TableName = "user";

  describe("findUserData", () => {
    it("알맞은 파라미터를 가지고 dynamoDB.get을 실행한 뒤 해당 값을 리턴한다.", async () => {
      const promise = jest.fn(() => "userData");

      dynamoDB.get.mockImplementation(() => {
        return { promise: promise };
      });

      const userId = "mockId";

      const params = {
        TableName: TableName,
        Key: { user_id: userId },
      };

      const userData = await findUserData(userId);

      expect(dynamoDB.get).toBeCalledWith(params);
      expect(dynamoDB.get).toBeCalledTimes(1);
      expect(promise).toBeCalledTimes(1);
      expect(userData).toEqual("userData");
    });
  });

  describe("registerUser", () => {
    it("알맞은 파라미터를 가지고 dynamoDB.put을 실행한다.", async () => {
      const promise = jest.fn(() => "userData");

      const userData = { userId: "mockId", password: "mockPassword" };
      const hash = "mockHashPassword";

      bcyrpt.genSalt.mockImplementation(() => 10);
      bcyrpt.hash.mockImplementation(() => hash);

      dynamoDB.put.mockImplementation(() => {
        return { promise: promise };
      });

      const params = {
        TableName: TableName,
        Item: {
          user_id: userData.userId,
          password: hash,
          unique_key: uuid(),
        },
      };

      await registerUser(userData);

      expect(dynamoDB.put).toBeCalledWith(params);
      expect(dynamoDB.put).toBeCalledTimes(1);
      expect(promise).toBeCalledTimes(1);
    });
  });
});
