const bcyrpt = require("bcrypt");

const dynamoDB = require("../../utils/dynamoDbUtil");
const uuid = require("../../utils/uuidUtil");

const tableName = "user";

const findUserData = async (userId) => {
  const params = {
    TableName: tableName,
    Key: { user_id: userId },
  };

  return await dynamoDB.get(params).promise();
};

const registerUser = async (userBody) => {
  const { userId, password } = userBody;

  const salt = await bcyrpt.genSalt(Number(process.env.SALT));
  const hash = await bcyrpt.hash(password, salt);
  const uniqueKey = uuid();

  const params = {
    TableName: tableName,
    Item: {
      user_id: userId,
      password: hash,
      unique_key: uniqueKey,
    },
  };

  await dynamoDB.put(params).promise();
};

module.exports = { findUserData, registerUser };
