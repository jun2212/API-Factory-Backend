const catchAsync = require("../utils/catchAsync");
const dynamoDB = require("../utils/dynamoDbUtil");
const uuid = require("../utils/uuidUtil");

const tableName = "user_function";

const insertFunction = catchAsync(async (req, res, next) => {
  const { user_id } = req.user;
  const { userCode } = req.body;
  const uniqueKey = uuid();

  const params = {
    TableName: tableName,
    Item: {
      function_Key: uniqueKey,
      user_id: user_id,
      user_code: userCode,
    },
  };

  await dynamoDB.put(params).promise();

  return res.status(200).json(uniqueKey);
});

const validationFunction = catchAsync(async (req, res, next) => {});

module.exports = { insertFunction };
