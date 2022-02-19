import { NonSupportedByPaymentGateway } from 'src/errors/non-supported-by-payment-gateway';
import { PaymentGatewayAuthenticationKey } from './payment-authentication.interface';

export class PaymentAuthentication {
  static apiKey = process.env.apiKey;

  static getPaymentGatewayAuthenticationToken(): PaymentGatewayAuthenticationKey {
    throw new NonSupportedByPaymentGateway();
  }
}
