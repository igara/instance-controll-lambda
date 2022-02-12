import { Handler } from 'aws-lambda';
import AWS from 'aws-sdk';

const lambda = new AWS.Lambda({
  endpoint: process.env.LAMBDA_ENDPOINT,
});

const ec2 = new AWS.EC2({
  region: process.env.EC2_REGION,
});

const ssm = new AWS.SSM({
  region: process.env.EC2_REGION,
});

type GetTargetENVEvent = {
  text: string;
};

const getTarget = (event: Partial<GetTargetENVEvent>) => {
  if (typeof event.text !== 'string') {
    throw new Error('メッセージがないとき');
  }

  const targetKeyValue = event.text.match(/target=\S*/);
  if (!targetKeyValue || targetKeyValue.length !== 1) {
    throw new Error('決められた指定ではないとき');
  }

  return targetKeyValue[0].replace('target=', '');
};

export const handler: Handler = async (event, _context, callback) => {
  try {
    const target = getTarget(event);
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

    const instance = instances.find((ins) => {
      if (!ins.Tags) {
        return false;
      }

      return ins.Tags.find((tag) => {
        if (tag.Key === 'Name') {
          return tag.Value === target;
        }

        return false;
      });
    });

    if (!instance || !instance.InstanceId) {
      throw new Error('targetに指定されたEC2環境はない');
    }

    const result = await ssm
      .sendCommand({
        DocumentName: 'AWS-RunShellScript',
        InstanceIds: [instance.InstanceId],
        Parameters: {
          commands: ['pwd > pwd.txt'],
          workingDirectory: ['/home/ssm-user'],
        },
        CloudWatchOutputConfig: {
          CloudWatchLogGroupName: 'SSMLogs',
          CloudWatchOutputEnabled: true,
        },
        TimeoutSeconds: 900,
      })
      .promise();

    console.info(result);
  } catch (e) {
    console.error(e);
    return callback('error');
  }

  return callback(null, '');
};
