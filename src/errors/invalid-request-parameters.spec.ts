import { ErrorCodeMessages } from './errors.interface';
import { InvalidRequestParameters } from './invalid-request-parameters';

describe('InvalidRequestParameters', () => {
  it('should be defined', () => {
    expect(InvalidRequestParameters).toBeDefined();
  });

  it('should generate proper exception', () => {
    const exception = new InvalidRequestParameters();

    expect(exception.code).toEqual(422);
    expect(exception.message).toEqual(ErrorCodeMessages[422]);
    expect(exception.error).toEqual(null);
  });

  it('should generate error if defined', () => {
    const errorObject = {
      test: 'error',
    };
    const exception = new InvalidRequestParameters(errorObject);

    expect(exception.code).toEqual(422);
    expect(exception.message).toEqual(ErrorCodeMessages[422]);
    expect(exception.error).toEqual(errorObject);
  });
});
