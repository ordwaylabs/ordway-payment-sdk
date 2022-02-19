import { HttpException, HttpStatus } from '@nestjs/common';
import { Exception, errorCodes, ErrorCodeMessages } from './errors.interface';

export class InvalidRequestParameters
  extends HttpException
  implements Exception
{
  constructor(
    public error = error,
    public code = errorCodes[2],
    public message = ErrorCodeMessages[errorCodes[2]],
  ) {
    super(message, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
