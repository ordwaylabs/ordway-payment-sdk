import { PaymentAuthentication } from './payment-authentication';

describe('PaymentAuthenticationService', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: PaymentAuthentication;

  it('should be defined', () => {
    expect(
      PaymentAuthentication.getPaymentGatewayAuthenticationToken,
    ).toBeDefined();
  });
});
