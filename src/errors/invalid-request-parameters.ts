import { HttpException, HttpStatus } from '@nestjs/common';
import { Exception, errorCodes, ErrorCodeMessages } from './errors.interface';

export class InvalidRequestParameters
  extends HttpException
  implements Exception
{
  constructor(
    public error = null,
    public code = errorCodes[2],
    public message = ErrorCodeMessages[errorCodes[2]],
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
