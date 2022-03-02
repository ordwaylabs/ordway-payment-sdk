import { Customer } from '../customer/customer.interface';
import { PaymentGatewayConfig } from '../utils/payment-gateway-config.interface';
import { PaymentMethod } from '../payment-methods/payment-methods.interface';

export interface Address {
  /**
   * Line 1 of the address
   */
  line1: string;
  /**
   * Line 2 of the address
   */
  line2: string;
  /**
   * City of the entity present
   */
  city: string;
  /**
   * Sate of the city
   */
  state: string;
  /**
   * Zip code
   */
  postal_code: string;
  /**
   * Country code of the entity
   */
  country_code: string;
}

export interface PaymentParam {
  gateway_config: PaymentGatewayConfig;
  customer_config?: Customer;
  /**
   * The unique identifier for a payment method for the customer
   */
  method_uid?: string;
  /**
   * The unique reference of the payment being authorised.
   */
  payment_uid?: string;
  /**
   * The payment amount to refund, if this is not provided then the entire payment amount will be refunded
   */
  amount?: number;
  /**
   * The currency of the original payment
   */
  currency?: string;
  /**
   * The optional description field that will be a part of the payment request this depends on the payment gateway support
   */
  description?: string;
  /**
   * The optional statement descriptor for non card charges that can appear on the customers statements
   */
  statement_descriptor?: string;
  /**
   * A set of key value pairs that can be tagged to the payment request, please note this will depend on the support by the payment gateway
   */
  options?: object;
  /**
   * The optional payment method information that can be passed while authorising the payment request,
   * this will be mutually exclusive with the method_uid.
   * This is useful when the customer would like to authorise the payment w/o storing the card information.
   */
  method?: PaymentMethod;
  /**
   * The address details if configured by the payment request.
   */
  address?: Address;
  /**
   * The optional reason field that can be provided for the refund request
   */
  reason?: string;
  /**
   * The transaction reference for refund of the payments
   */
  transaction_ref?: string;
  /**
   * How many results to return. Between 1 and 100, defaults to 20
   */
  limit?: number;
  /**
   * How many results to skip
   */
  offset?: number;
  /**
   * Datetime to start the search from, in ISO8601 format
   */
  from?: Date;
  /**
   * Datetime to start the search to, in ISO8601 format
   */
  to?: Date;
  /**
   * Customer ID to be filtered.
   */
  customer_uid?: string;
}

export interface PaymentResponse {
  /**
   * The status for the create payment request
   */
  status: 'succeeded' | 'failed';
  /**
   * The successful payment transaction identifier,
   * this is the ID that will be used for to link to a successful refund request at the payment gateway
   */
  transaction_ref: string;
  /**
   * The details of the payment method used to authorize the payment.
   */
  method: PaymentMethod;
  /**
   * The payment amount authorized. This can be used for reconciliations
   */
  amount: number;
  /**
   * The fees that were charged for the payment transaction, this is optional and will be defaulted to 0 if not provided.
   */
  fees: number;
  /**
   * The actual gateway response stored for reference and debug purposes.
   */
  gateway_resp: object;
  /**
   * This is an optional field that can be returned by the SDK
   * that will be appended to the payment notes for further details of the payment transaction if required.
   */
  response_note?: string;
  /**
   * The unique reference of the payment sent as a part of the request
   */
  payment_uid: string;
}

export interface PaymentServiceInterface {
  /**
   * getPayment
   * endpoint: get (POST)
   */
  get: (PaymentParam) => Promise<PaymentResponse>;
  /**
   * createPayment
   * endpoint: create (POST)
   */
  create: (params: PaymentParam) => Promise<PaymentResponse>;
  /**
   * refundPayment
   * endpoint: refund (POST)
   */
  refund: (
    params: Partial<PaymentParam> | Partial<PaymentResponse>,
  ) => Promise<PaymentResponse>;
  /**
   * voidPayment
   * endpoint: void (POST)
   */
  void: (
    params: Partial<PaymentParam> | Partial<PaymentResponse>,
  ) => Promise<PaymentResponse>;
  /**
   * reconcilePayments
   * endpoint: reconcile (POST)
   */
  reconcile: (
    params: Partial<PaymentParam> | Partial<PaymentResponse>,
  ) => Promise<PaymentResponse[]>;
}
