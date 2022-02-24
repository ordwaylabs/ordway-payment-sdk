import { Injectable } from '@nestjs/common';
import { NonSupportedByPaymentGateway } from '../errors/non-supported-by-payment-gateway';
import { Customer, PaymentGatewayCustomer } from './customer.interface';

@Injectable()
export class CustomerService implements PaymentGatewayCustomer {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get(customer_uid: string): Promise<Customer> {
    throw new NonSupportedByPaymentGateway();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(customer: Customer): Promise<Customer> {
    throw new NonSupportedByPaymentGateway();
  }
}
