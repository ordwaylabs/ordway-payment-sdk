import { HttpException, HttpStatus } from '@nestjs/common';
import { Exception, errorCodes, ErrorCodeMessages } from './errors.interface';

export class NonSupportedByPaymentGateway
  extends HttpException
  implements Exception
{
  constructor(
    readonly error = null,
    readonly code = errorCodes[4],
    readonly message = ErrorCodeMessages[errorCodes[4]],
  ) {
    super(
      {
        error,
        code,
        message,
      },
      HttpStatus.NOT_IMPLEMENTED,
    );
  }
}
