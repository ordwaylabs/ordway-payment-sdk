import { PaymentMethod } from '../payment-methods/payment-methods.interface';

export interface Customer {
  /**
   * The unique identifier for the customer
   */
  customer_uid: string;
  /**
   * The unique customer id provided by the payment gateway if any
   */
  gateway_id: string;
  /**
   * The array of payment methods for the the given customer
   */
  methods: PaymentMethod;
}

export interface PaymentGatewayCustomer {
  /**
   * PaymentMethods
   * endpoint => get_customer (GET)
   */
  get: (customer_uid: string) => Customer;

  /**
   * PaymentMethods
   * endpoint => get_customer (POST)
   */
  create: (customer: Customer) => Customer;
}
