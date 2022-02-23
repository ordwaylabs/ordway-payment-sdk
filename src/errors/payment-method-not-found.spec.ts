import { ErrorCodeMessages } from './errors.interface';
import { PaymentMethodNotFound } from './payment-method-not-found';

describe('PaymentMethodNotFound', () => {
  it('should be defined', () => {
    expect(PaymentMethodNotFound).toBeDefined();
  });

  it('should generate proper exception', () => {
    const exception = new PaymentMethodNotFound();

    expect(exception.code).toEqual(401);
    expect(exception.message).toEqual(ErrorCodeMessages[401]);
    expect(exception.error).toEqual(null);
  });

  it('should generate error if defined', () => {
    const errorObject = {
      test: 'error',
    };
    const exception = new PaymentMethodNotFound(errorObject);

    expect(exception.code).toEqual(401);
    expect(exception.message).toEqual(ErrorCodeMessages[401]);
    expect(exception.error).toEqual(errorObject);
  });
});
