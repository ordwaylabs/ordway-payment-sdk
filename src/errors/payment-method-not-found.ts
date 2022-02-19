import { HttpException, HttpStatus } from '@nestjs/common';
import { Exception, errorCodes, ErrorCodeMessages } from './errors.interface';

export class PaymentMethodNotFound extends HttpException implements Exception {
  constructor(
    public error = error,
    public code = errorCodes[0],
    public message = ErrorCodeMessages[errorCodes[0]],
  ) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
