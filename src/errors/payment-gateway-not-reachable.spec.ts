import { ErrorCodeMessages } from './errors.interface';
import { PaymentGatewayNotReachable } from './payment-gateway-not-reachable';

describe('PaymentGatewayNotReachable', () => {
  it('should be defined', () => {
    expect(PaymentGatewayNotReachable).toBeDefined();
  });

  it('should generate proper exception', () => {
    const exception = new PaymentGatewayNotReachable();

    expect(exception.code).toEqual(101);
    expect(exception.message).toEqual(ErrorCodeMessages[101]);
    expect(exception.error).toEqual(null);
  });

  it('should generate error if defined', () => {
    const errorObject = {
      test: 'error',
    };
    const exception = new PaymentGatewayNotReachable(errorObject);

    expect(exception.code).toEqual(101);
    expect(exception.message).toEqual(ErrorCodeMessages[101]);
    expect(exception.error).toEqual(errorObject);
  });
});
