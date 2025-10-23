export const errorCodes = [
  401, 101, 422, 402, 4011, 4221, 4222, 4012, 403,
] as const;

type ErrorCodes = (typeof errorCodes)[number];

export const ErrorCodeMessages: Record<ErrorCodes, string> = {
  401: 'Payment method details not found',
  101: 'Payment gateway not reachable',
  422: 'Invalid parameters',
  4221: 'Missing request parameters',
  4222: 'Incorrectly formatted request parameters',
  402: 'Payment failed',
  4011: 'Not supported operation by the payment gateway',
  4012: 'Not authorised for user id and tenant id',
  403: 'Request Forbidden',
};

export interface Exception {
  /**
   * Actual error object
   */
  error?: object;
  /**
   * Actual error object
   */
  errors?: object;
  /**
   * The unique codes defining the errors
   */
  code: ErrorCodes;
  /**
   * The error message detailing the cause of the issue
   */
  message: string;
}
