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
                Reservations: [],
              });
            },
          };
        },
      };
    }),
  };
});

describe('status_all_instance/no_instance', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('EC2インスタンスがないとき', async () => {
    const eventMock = jest.fn();
    const contextMock = jest.fn();
    const callbackMock = jest.fn();

    await handler(eventMock, contextMock, callbackMock);

    expect([null, 'EC2インスタンスが存在しません']).toEqual(callbackMock.mock.calls[0]);
  });
});
