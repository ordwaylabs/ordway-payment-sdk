import { InvalidParametersFormat } from './invalid-parameters-format';

describe('InvalidParametersFormat', () => {
  it('should be defined', () => {
    expect(InvalidParametersFormat).toBeDefined();
  });

  it('should generate proper exception', () => {
    const exception = new InvalidParametersFormat();

    expect(exception.code).toEqual(4222);
    expect(exception.message).toEqual(
      'Incorrectly formatted request parameters',
    );
    expect(exception.error).toEqual(null);
  });

  it('should generate error if defined', () => {
    const errorObject = {
      test: 'error',
    };
    const exception = new InvalidParametersFormat(errorObject);

    expect(exception.code).toEqual(4222);
    expect(exception.message).toEqual(
      'Incorrectly formatted request parameters',
    );
    expect(exception.error).toEqual(errorObject);
  });
});
