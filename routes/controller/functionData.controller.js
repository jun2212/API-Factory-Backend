const catchAsync = require("../../utils/catchAsync");
const dynamoDB = require("../../utils/dynamoDbUtil");
const uuid = require("../../utils/uuidUtil");

const tableName = "user_function";

const insertFunction = catchAsync(async (req, res, next) => {
  const { user_id, unique_key } = req.user;
  const { method, name, code } = req.body;
  const uniqueKey = uuid();

  const params = {
    TableName: tableName,
    Item: {
      function_key: uniqueKey,
      user_id: user_id,
      user_key: unique_key,
      method: method,
      name: name,
      code: code,
    },
  };

  await dynamoDB.put(params).promise();

  return res.status(200).json(uniqueKey);
});

const getUserFunctions = catchAsync(async (req, res, next) => {
  const { user_id } = req.user;

  const params = {
    TableName: tableName,
    Key: { user_id: user_id },
    IndexName: "userIdIndex",
    KeyConditionExpression: "user_id = :id",
    ExpressionAttributeValues: { ":id": user_id },
  };

  const user_functions = await dynamoDB.query(params).promise();

  return res.status(200).json(user_functions);
});

const getSelectedFunction = catchAsync(async (req, res, next) => {
  const { functionKey } = req.params;
  const params = {
    TableName: "user_function",
    Key: { function_key: functionKey },
  };

  const selectedFunction = await dynamoDB.get(params).promise();

  return res.status(200).json(selectedFunction);
});

const updateFunction = catchAsync(async (req, res, next) => {
  const { functionKey, method, name, code } = req.body;

  const params = {
    TableName: tableName,
    Key: {
      function_key: functionKey,
    },
    UpdateExpression: "set #new_method=:m, #new_name=:n, code=:c",
    ExpressionAttributeNames: {
      "#new_method": "method",
      "#new_name": "name",
    },
    ExpressionAttributeValues: {
      ":m": method,
      ":n": name,
      ":c": code,
    },
  };

  await dynamoDB.update(params).promise();

  return res.status(200).json("update success");
});

const deleteFunction = catchAsync(async (req, res, next) => {
  const { functionKey } = req.params;

  const params = {
    TableName: tableName,
    Key: {
      function_key: functionKey,
    },
  };

  await dynamoDB.delete(params).promise();

  return res.status(200).json("delete success");
});

module.exports = {
  insertFunction,
  getUserFunctions,
  getSelectedFunction,
  updateFunction,
  deleteFunction,
};
