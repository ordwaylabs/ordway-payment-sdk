import { HttpException, HttpStatus } from '@nestjs/common';
import { Exception, errorCodes, ErrorCodeMessages } from './errors.interface';

export class PaymentGatewayNotReachable
  extends HttpException
  implements Exception
{
  constructor(
    public error = error,
    public code = errorCodes[1],
    public message = ErrorCodeMessages[errorCodes[1]],
  ) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
