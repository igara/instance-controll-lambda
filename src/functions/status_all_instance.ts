import { Handler } from 'aws-lambda';
import AWS from 'aws-sdk';

const lambda = new AWS.Lambda({
  endpoint: process.env.LAMBDA_ENDPOINT,
});

const ec2 = new AWS.EC2({
  region: process.env.EC2_REGION,
});

export const handler: Handler = (_event, _context, callback) => {
  // ec2.describeInstances().promise();
  callback(null, '');
};
