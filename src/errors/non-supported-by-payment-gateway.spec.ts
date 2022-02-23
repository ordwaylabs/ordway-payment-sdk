import { ErrorCodeMessages } from './errors.interface';
import { NonSupportedByPaymentGateway } from './non-supported-by-payment-gateway';

describe('NonSupportedByPaymentGateway', () => {
  it('should be defined', () => {
    expect(NonSupportedByPaymentGateway).toBeDefined();
  });

  it('should generate proper exception', () => {
    const exception = new NonSupportedByPaymentGateway();

    expect(exception.code).toEqual(4011);
    expect(exception.message).toEqual(ErrorCodeMessages[4011]);
    expect(exception.error).toEqual(null);
  });

  it('should generate error if defined', () => {
    const errorObject = {
      test: 'error',
    };
    const exception = new NonSupportedByPaymentGateway(errorObject);

    expect(exception.code).toEqual(4011);
    expect(exception.message).toEqual(ErrorCodeMessages[4011]);
    expect(exception.error).toEqual(errorObject);
  });
});
