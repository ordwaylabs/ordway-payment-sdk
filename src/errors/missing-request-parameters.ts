import { HttpException, HttpStatus } from '@nestjs/common';
import { Exception, errorCodes, ErrorCodeMessages } from './errors.interface';

export class MissingRequestParameters
  extends HttpException
  implements Exception
{
  constructor(
    public error = null,
    public code = errorCodes[5],
    public message = ErrorCodeMessages[errorCodes[5]],
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
