const {
  insertFunction,
  getUserFunctions,
  updateFunction,
  deleteFunction,
} = require("../routes/controller/functionData.controller");

const uuid = require("../utils/uuidUtil");
const dynamoDB = require("../utils/dynamoDbUtil");

jest.mock("../utils/dynamoDbUtil");

jest.mock("../utils/uuidUtil", () =>
  jest.fn().mockImplementation(() => "mockKey"),
);

describe("functionData.controller", () => {
  const TableName = "user_function";

  beforeEach(() => {
    req = {
      user: {
        user_id: "mockID",
        unique_key: "mockUnique_key"
      },
      body: {
        method: "mockMethod",
        name: "mockName",
        code: "mockCode",
        functionKey: "mockKey",
      },
    };
    res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    };
    next = jest.fn();
  });

  describe("insertFunction", () => {
    it("알맞은 파라미터를 가지고 dynamoDB.put을 실행한다. status = 200, json = function_key", async () => {
      const promise = jest.fn();

      dynamoDB.put.mockImplementation(() => {
        return { promise: promise };
      });

      const params = {
        TableName: TableName,
        Item: {
          function_key: uuid(),
          user_id: req.user.user_id,
          user_key: req.user.unique_key,
          method: req.body.method,
          name: req.body.name,
          code: req.body.code,
        },
      };

      await insertFunction(req, res, next);

      expect(dynamoDB.put).toBeCalledWith(params);
      expect(dynamoDB.put).toBeCalledTimes(1);
      expect(promise).toBeCalledTimes(1);
      expect(res.status).toBeCalledWith(200);
      expect(res.status).toBeCalledTimes(1);
      expect(res.json).toBeCalledWith("mockKey");
      expect(res.json).toBeCalledTimes(1);
    });
  });

  describe("getUserFunctions", () => {
    it("알맞은 파라미터로 dynamoDB.query를 실행한다. status = 200, json = 'userFunctions'", async () => {
      const promise = jest.fn(() => "userFunctions");

      dynamoDB.query.mockImplementation(() => {
        return { promise: promise };
      });

      const params = {
        TableName: TableName,
        Key: { user_id: req.user.user_id },
        IndexName: "userIdIndex",
        KeyConditionExpression: "user_id = :id",
        ExpressionAttributeValues: { ":id": req.user.user_id },
      };

      await getUserFunctions(req, res, next);

      expect(dynamoDB.query).toBeCalledWith(params);
      expect(dynamoDB.query).toBeCalledTimes(1);
      expect(res.status).toBeCalledWith(200);
      expect(res.status).toBeCalledTimes(1);
      expect(res.json).toBeCalledWith("userFunctions");
      expect(res.json).toBeCalledTimes(1);
    });
  });

  describe("updateFunction", () => {
    it("알맞은 파라미터로 dynamoDB.update를 실행한다. status = 200, json = 'update success'", async () => {
      const promise = jest.fn();

      dynamoDB.update.mockImplementation(() => {
        return { promise: promise };
      });

      const params = {
        TableName: TableName,
        Key: {
          function_key: req.body.functionKey,
        },
        UpdateExpression: "set #new_method=:m, #new_name=:n, code=:c",
        ExpressionAttributeNames: {
          "#new_method": "method",
          "#new_name": "name",
        },
        ExpressionAttributeValues: {
          ":m": req.body.method,
          ":n": req.body.name,
          ":c": req.body.code,
        },
      };

      await updateFunction(req, res, next);

      expect(dynamoDB.update).toBeCalledWith(params);
      expect(dynamoDB.update).toBeCalledTimes(1);
      expect(res.status).toBeCalledWith(200);
      expect(res.status).toBeCalledTimes(1);
      expect(res.json).toBeCalledWith("update success");
      expect(res.json).toBeCalledTimes(1);
    });
  });

  describe("deleteFunction", () => {
    it("알맞은 파라미터로 dynamoDB.delete를 실행한다. status = 200, json = 'delete success'", async () => {
      const promise = jest.fn();

      dynamoDB.delete.mockImplementation(() => {
        return { promise: promise };
      });

      const params = {
        TableName: TableName,
        Key: {
          function_key: "mockKey",
        },
      };

      req.params = { functionKey: "mockKey" };

      await deleteFunction(req, res, next);

      expect(dynamoDB.delete).toBeCalledWith(params);
      expect(dynamoDB.delete).toBeCalledTimes(1);
      expect(res.status).toBeCalledWith(200);
      expect(res.status).toBeCalledTimes(1);
      expect(res.json).toBeCalledWith("delete success");
      expect(res.json).toBeCalledTimes(1);
    });
  });
});
