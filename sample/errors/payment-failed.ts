import { HttpException, HttpStatus } from '@nestjs/common';
import { Exception, errorCodes, ErrorCodeMessages } from './errors.interface';

export class PaymentFailed extends HttpException implements Exception {
  constructor(
    public error = null,
    public code = errorCodes[3],
    public message = ErrorCodeMessages[errorCodes[3]],
  ) {
    super(
      {
        error,
        code,
        message,
      },
      HttpStatus.PAYMENT_REQUIRED,
    );
  }
}
