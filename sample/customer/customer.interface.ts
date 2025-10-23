import { PaymentMethod } from '../payment-methods/payment-methods.interface';
import { GetCustomerPaymentMethodDto } from '../payment-methods/dto/get-customer-payment-method.dto';

export interface Address {
  /**
   * Line1 of the address
   */
  line1: string;
  /**
   * Line2 of the address
   */
  line2?: string;
  /**
   * City of the address
   */
  city: string;
  /**
   * State of the address
   */
  state: string;
  /**
   * Country of the address
   */
  country: string;
  /**
   * Postal code of the address
   */
  postal: string;
  /**
   * Default address or not
   */
  default?: boolean;
  /**
   * Label for the address
   */
  label: string;
}

export interface Customer {
  /**
   * Name of the Customer
   */
  name: string;
  /**
   * Email for the customer
   */
  email: string;
  /**
   * Phone number
   */
  phone: string;
  /**
   * The unique identifier for the customer
   */
  uuid: string;
  /**
   * The unique customer id provided by the payment gateway if any
   */
  gateway_id?: string;
  /**
   * The array of payment methods for the the given customer
   */
  methods?: PaymentMethod;
  /**
   * Addresses for the customer
   */
  addresses?: Address[];
}

export interface PaymentGatewayCustomer {
  /**
   * PaymentMethods
   * endpoint => get_customer (GET)
   */
  get: (
    params: GetCustomerPaymentMethodDto,
    testMode: boolean,
  ) => Promise<Customer>;

  /**
   * PaymentMethods
   * endpoint => get_customer (POST)
   */
  create: (customer: Customer, testMode: boolean) => Promise<Customer>;
}
