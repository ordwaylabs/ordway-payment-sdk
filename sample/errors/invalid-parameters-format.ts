import { HttpException, HttpStatus } from '@nestjs/common';
import { Exception, errorCodes, ErrorCodeMessages } from './errors.interface';

export class InvalidParametersFormat
  extends HttpException
  implements Exception
{
  constructor(
    public error = null,
    public code = errorCodes[6],
    public message = ErrorCodeMessages[errorCodes[6]],
  ) {
    super(
      {
        error,
        code,
        message,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
