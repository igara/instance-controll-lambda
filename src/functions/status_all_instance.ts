import { Handler } from 'aws-lambda';
import AWS from 'aws-sdk';

const lambda = new AWS.Lambda({
  endpoint: process.env.LAMBDA_ENDPOINT,
});

const ec2 = new AWS.EC2({
  region: process.env.EC2_REGION,
});

export const handler: Handler = async (_event, _context, callback) => {
  const describeInstances = await ec2.describeInstances().promise();

  if (!describeInstances.Reservations || describeInstances.Reservations.length === 0) {
    console.info('EC2インスタンスが存在しません');
    return callback(null, 'EC2インスタンスが存在しません');
  }

  const instances = describeInstances.Reservations.reduce((curry, reservation) => {
    if (!reservation.Instances) {
      return curry;
    }

    reservation.Instances.forEach((instance) => {
      curry.push(instance);
    });

    return curry;
  }, [] as AWS.EC2.Instance[]);

  console.info(JSON.stringify(instances));

  return callback(null, '');
};
