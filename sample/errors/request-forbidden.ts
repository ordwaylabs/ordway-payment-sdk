import { HttpException, HttpStatus } from '@nestjs/common';
import { Exception, errorCodes, ErrorCodeMessages } from './errors.interface';

export class RequestForbidden extends HttpException implements Exception {
  constructor(
    readonly errors = null,
    readonly code = errorCodes[8],
    readonly message = ErrorCodeMessages[errorCodes[8]],
  ) {
    super(
      {
        errors,
        code,
        message,
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
