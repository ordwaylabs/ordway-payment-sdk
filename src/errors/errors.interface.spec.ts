import { ErrorCodeMessages, errorCodes } from './errors.interface';

describe('ErrorCodeMessages', () => {
  it('should be defined', () => {
    expect(ErrorCodeMessages).toBeDefined();
  });
  it('should have all error codes', () => {
    expect(ErrorCodeMessages[101]).toEqual('Payment gateway not reachable');
    expect(ErrorCodeMessages[401]).toEqual('Payment method details not found');
    expect(ErrorCodeMessages[402]).toEqual('Payment failed');
    expect(ErrorCodeMessages[422]).toEqual('Invalid  parameters');
    expect(ErrorCodeMessages[4011]).toEqual(
      'Not supported operation by the payment gateway',
    );
    expect(ErrorCodeMessages[4221]).toEqual('Missing request parameters');
    expect(ErrorCodeMessages[4222]).toEqual(
      'Incorrectly formatted request parameters',
    );
    expect(errorCodes.length).toEqual(7);
  });
});
