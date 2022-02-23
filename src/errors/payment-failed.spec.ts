import { ErrorCodeMessages } from './errors.interface';
import { PaymentFailed } from './payment-failed';

describe('PaymentFailed', () => {
  it('should be defined', () => {
    expect(PaymentFailed).toBeDefined();
  });

  it('should generate proper exception', () => {
    const exception = new PaymentFailed();

    expect(exception.code).toEqual(402);
    expect(exception.message).toEqual(ErrorCodeMessages[402]);
    expect(exception.error).toEqual(null);
  });

  it('should generate error if defined', () => {
    const errorObject = {
      test: 'error',
    };
    const exception = new PaymentFailed(errorObject);

    expect(exception.code).toEqual(402);
    expect(exception.message).toEqual(ErrorCodeMessages[402]);
    expect(exception.error).toEqual(errorObject);
  });
});
