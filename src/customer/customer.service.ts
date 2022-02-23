import { Injectable } from '@nestjs/common';
import { NonSupportedByPaymentGateway } from '../errors/non-supported-by-payment-gateway';
import { Customer, PaymentGatewayCustomer } from './customer.interface';

@Injectable()
export class CustomerService implements PaymentGatewayCustomer {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  get(customer_uid: string): Customer {
    throw new NonSupportedByPaymentGateway();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(customer: Customer): Customer {
    throw new NonSupportedByPaymentGateway();
  }
}
