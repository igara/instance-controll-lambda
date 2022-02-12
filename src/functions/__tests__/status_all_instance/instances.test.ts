import { handler } from '../../status_all_instance';

jest.mock('aws-sdk', () => {
  return {
    Lambda: jest.fn().mockImplementationOnce(() => jest.fn()),
    EC2: jest.fn().mockImplementationOnce(() => {
      return {
        describeInstances: () => {
          return {
            promise: () => {
              return Promise.resolve({
                Reservations: [
                  {
                    Instances: [
                      {
                        AmiLaunchIndex: 0,
                        ImageId: 'ami-xxxxx',
                        InstanceId: 'i-xxxxx',
                        InstanceType: 't2.micro',
                        LaunchTime: '2022-02-06T14:19:30.000Z',
                        Monitoring: {
                          State: 'disabled',
                        },
                        Placement: {
                          AvailabilityZone: 'us-east-1d',
                          GroupName: '',
                          Tenancy: 'default',
                        },
                        PrivateDnsName: '',
                        ProductCodes: [],
                        PublicDnsName: '',
                        State: {
                          Code: 48,
                          Name: 'terminated',
                        },
                        StateTransitionReason: 'User initiated (2022-02-06 14:24:52 GMT)',
                        Architecture: 'x86_64',
                        BlockDeviceMappings: [],
                        ClientToken: '',
                        EbsOptimized: false,
                        EnaSupport: true,
                        Hypervisor: 'xen',
                        ElasticGpuAssociations: [],
                        ElasticInferenceAcceleratorAssociations: [],
                        NetworkInterfaces: [],
                        RootDeviceName: '/dev/xvda',
                        RootDeviceType: 'ebs',
                        SecurityGroups: [],
                        StateReason: {
                          Code: 'Client.UserInitiatedShutdown',
                          Message:
                            'Client.UserInitiatedShutdown: User initiated shutdown',
                        },
                        Tags: [
                          {
                            Key: 'Name',
                            Value: 'dev1',
                          },
                        ],
                        VirtualizationType: 'hvm',
                        CpuOptions: {
                          CoreCount: 1,
                          ThreadsPerCore: 1,
                        },
                        CapacityReservationSpecification: {
                          CapacityReservationPreference: 'open',
                        },
                        HibernationOptions: {
                          Configured: false,
                        },
                        Licenses: [],
                        MetadataOptions: {
                          State: 'pending',
                          HttpTokens: 'optional',
                          HttpPutResponseHopLimit: 1,
                          HttpEndpoint: 'enabled',
                          HttpProtocolIpv6: 'disabled',
                        },
                        EnclaveOptions: {
                          Enabled: false,
                        },
                        PlatformDetails: 'Linux/UNIX',
                        UsageOperation: 'RunInstances',
                        UsageOperationUpdateTime: '2022-02-06T14:19:30.000Z',
                      },
                    ],
                  },
                ],
              });
            },
          };
        },
      };
    }),
  };
});

describe('status_all_instance/instances', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('EC2インスタンスが存在するとき', async () => {
    const eventMock = jest.fn();
    const contextMock = jest.fn();
    const callbackMock = jest.fn();

    await handler(eventMock, contextMock, callbackMock);

    expect([null, '']).toEqual(callbackMock.mock.calls[0]);
  });
});
