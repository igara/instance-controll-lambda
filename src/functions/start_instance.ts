import { Handler } from 'aws-lambda';
import AWS from 'aws-sdk';

const lambda = new AWS.Lambda({
  endpoint: process.env.LAMBDA_ENDPOINT,
});

export const handler: Handler = (_event, _context, callback) => {
  callback(null, '');
};
