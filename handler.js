'use strict';
var AWS = require("aws-sdk");
var dynamoDBConfiguration = {
   "accessKeyId": "AKIAJRL3HRX3LH3GTPLQ",
   "secretAccessKey": "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",
   "region": "us-east-1"
};

AWS.config.update(dynamoDBConfiguration);
var dynClient = new AWS.DynamoDB.DocumentClient();

module.exports.hello = (event, context, callback) => {

  var params = {
    TableName: 'restaurants'
  };
  dynClient.scan(params, function(err, data) {
    if(err){
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Error fetching restaurant list',
      });
      return;
		}

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        restaurants: data.Items
      }),
    };

    callback(null, response);

  });



  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
