import { HttpException, HttpStatus } from '@nestjs/common';
import { Exception, errorCodes, ErrorCodeMessages } from './errors.interface';

export class InvalidParametersFormat
  extends HttpException
  implements Exception
{
  constructor(
    public error = error,
    public code = errorCodes[6],
    public message = ErrorCodeMessages[errorCodes[6]],
  ) {
    super(message, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
