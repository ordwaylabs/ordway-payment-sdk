import { HttpException, HttpStatus } from '@nestjs/common';
import { Exception, errorCodes, ErrorCodeMessages } from './errors.interface';

export class InvalidRequestParameters
  extends HttpException
  implements Exception
{
  constructor(
    public errors = null,
    public code = errorCodes[2],
    public message = ErrorCodeMessages[errorCodes[2]],
  ) {
    super(
      {
        errors,
        code,
        message,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
