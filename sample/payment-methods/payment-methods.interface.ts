import { PaymentGatewayConfig } from '../utils/payment-gateway-config.interface';
import { HtmlFields } from '../utils/html-field.interface';
import { GetCustomerPaymentMethodDto } from './dto/get-customer-payment-method.dto';
import { GetPaymentMethodDto } from './dto/get-payment-method.dto';
import { AddPaymentMethodDto } from './dto/add-payment-method.dto';
import { DeletePaymentMethodDto } from './dto/delete-payment-method.dto';
import { AttachPaymentMethodDto } from './dto/attach-payment-method.dto';

export enum PaymentType {
  CREDITCARD = 0,
  ACH = 1,
}

export interface DeletePaymentMethodResponse {
  /**
   * Status of the delete Payment method.
   */
  status: string;
  /**
   * List of payment method ids that are deleted.
   */
  method_uids: any[];
}

export interface CustomerPaymentMethod {
  /**
   * The customer gateway id.
   */
  gateway_id: string;

  method: PaymentMethod;
}

export interface PaymentMethod {
  /**
   * Unique id for the give method
   */
  uuid: string;
  /**
   * Card holder name
   */
  name: string;
  /**
   * The integer number indicating the payment type
   * 0 => credit card
   * 1 => ACH
   */
  method_type: PaymentType;
  /**
   * The obfuscated account number for display
   */
  last4: string;
  /**
   * The optional token id if stored against a method
   */
  token_id: string;
  /**
   * The type of payment method for e.g. VISA, ECHK, etc.
   */
  brand: string;
  /**
   * The expiry month for the given payment method applicable for credit cards
   */
  month?: number;
  /**
   * The expiry year for the given payment method applicable for credit cards
   */
  year?: number;
  /**
   * The flag to indicate if the given payment method is the default payment method or not
   */
  default: boolean;
  /**
   * The flag to indicate if the given payment method is verified or not
   */
  status: string;
  /**
   * The object capturing any other optional details for the given payment method
   */
  opt?: object;
}

export interface params {
  [any: string]: string | number;
}

export interface PaymentMethodsServiceInterface {
  /**
   * PaymentMethods
   * endpoint => get_customer_payment_methods (POST)
   */
  getCustomerPaymentMethods: (
    params: GetCustomerPaymentMethodDto,
    testMode: boolean,
  ) => Promise<PaymentMethod[]>;
  /**
   * PaymentMethods
   * endpoint => {:uuid}/get_payment_method (POST)
   */
  getPaymentMethodDetails: (
    params: GetPaymentMethodDto,
    testMode: boolean,
  ) => Promise<PaymentMethod>;
  /**
   * getAddCCMethodForm
   * endpoint => get_add_cc_method_form (POST)
   */
  getAddCCMethodForm: (
    params: {
      gateway_config: PaymentGatewayConfig;
    },
    testMode: boolean,
  ) => HtmlFields;
  /**
   * getAddACHMethodForm
   * endpoint => get_add_ach_method_form (POST)
   */
  getAddACHMethodForm: (
    params: {
      gateway_config: PaymentGatewayConfig;
    },
    testMode: boolean,
  ) => HtmlFields;
  /**
   * addPaymentMethod
   * endpoint => add_payment_method (POST)
   */
  addPaymentMethod: (
    params: AddPaymentMethodDto,
    testMode: boolean,
  ) => Promise<CustomerPaymentMethod>;
  /**
   * deletePaymentMethod
   * endpoint => delete_payment_method (POST)
   */
  deletePaymentMethod: (
    params: DeletePaymentMethodDto,
    testMode: boolean,
  ) => Promise<DeletePaymentMethodResponse>;

  /**
   * deletePaymentMethod
   * endpoint => delete_payment_method (POST)
   */
  attachPaymentMethod: (
    params: AttachPaymentMethodDto,
    testMode: boolean,
  ) => Promise<PaymentMethod>;
}
