import { ErrorCodeMessages } from './errors.interface';
import { MissingRequestParameters } from './missing-request-parameters';

describe('MissingRequestParameters', () => {
  it('should be defined', () => {
    expect(MissingRequestParameters).toBeDefined();
  });

  it('should generate proper exception', () => {
    const exception = new MissingRequestParameters();

    expect(exception.code).toEqual(4221);
    expect(exception.message).toEqual(ErrorCodeMessages[4221]);
    expect(exception.error).toEqual(null);
  });

  it('should generate error if defined', () => {
    const errorObject = {
      test: 'error',
    };
    const exception = new MissingRequestParameters(errorObject);

    expect(exception.code).toEqual(4221);
    expect(exception.message).toEqual(ErrorCodeMessages[4221]);
    expect(exception.error).toEqual(errorObject);
  });
});
