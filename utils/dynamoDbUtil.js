const AWS = require("aws-sdk");

const key = {
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
};

AWS.config.update(key);
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports = dynamoDB;
