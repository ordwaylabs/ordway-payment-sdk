import { PaymentGatewayConfig } from '../utils/payment-gateway-config.interface';
import { Customer } from '../customer/customer.interface';
import { HtmlFields } from '../utils/html-field.interface';

export enum PaymentType {
  CREDITCARD = 0,
  ACH = 1,
}

export interface DeletePaymentMethodResponse {
  /**
   * Status of the delete Payment method.
   */
  status: boolean;
  /**
   * List of payment method ids that are deleted.
   */
  method_uids: string[];
}

export interface PaymentMethod {
  /**
   * Unique id for the give method
   */
  method_uid: string;
  /**
   * The integer number indicating the payment type
   * 0 => credit card
   * 1 => ACH
   */
  payment_type: PaymentType;
  /**
   * The obfuscated account number for display
   */
  display_account_number: string;
  /**
   * The optional token id if stored against a method
   */
  token: string;
  /**
   * The type of payment method for e.g. VISA, ECHK, etc.
   */
  type: string;
  /**
   * The expiry month and year for the given payment method applicable for credit cards
   */
  expiry?: string;
  /**
   * The flag to indicate if the given payment method is the default payment method or not
   */
  default: boolean;
  /**
   * The object capturing any other optional details for the given payment method
   */
  options?: object;
}

export interface params {
  [any: string]: string | number;
}

export interface PaymentMethodsServiceInterface {
  /**
   * PaymentMethods
   * endpoint => get_customer_payment_methods (POST)
   */
  getCustomerPaymentMethods: (params: {
    gateway_config: PaymentGatewayConfig;
    customer_config: Customer;
  }) => PaymentMethod[];
  /**
   * PaymentMethods
   * endpoint => {:method_uid}/get_payment_method (POST)
   */
  getPaymentMethodDetails: (params: {
    gateway_config: PaymentGatewayConfig;
    customer_config: Customer;
    method_uid: string;
  }) => PaymentMethod;
  /**
   * getAddCCMethodForm
   * endpoint => get_add_cc_method_form (POST)
   */
  getAddCCMethodForm: (params: {
    gateway_config: PaymentGatewayConfig;
  }) => HtmlFields;
  /**
   * getAddACHMethodForm
   * endpoint => get_add_ach_method_form (POST)
   */
  getAddACHMethodForm: (params: {
    gateway_config: PaymentGatewayConfig;
  }) => HtmlFields;
  /**
   * addPaymentMethod
   * endpoint => add_payment_method (POST)
   */
  addPaymentMethod: (params: {
    gateway_config: PaymentGatewayConfig;
    customer_config: Customer;
    params: params;
  }) => PaymentMethod;
  /**
   * updatePaymentMethod
   * endpoint => update_payment_method (POST)
   */
  updatePaymentMethod: (params: {
    gateway_config: PaymentGatewayConfig;
    customer_config: Customer;
    params: params;
  }) => PaymentMethod;
  /**
   * deletePaymentMethod
   * endpoint => delete_payment_method (POST)
   */
  deletePaymentMethod: (params: {
    gateway_config: PaymentGatewayConfig;
    customer_config: Customer;
    method_uid: string;
    method_uids: string[];
  }) => DeletePaymentMethodResponse;
}
