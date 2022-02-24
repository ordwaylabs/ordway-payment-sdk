import { HtmlFields } from '../utils/html-field.interface';
import { PaymentGatewayConfig } from '../utils/payment-gateway-config.interface';

/**
 * On boarding fields for html rendering.
 */
export interface SetupTenantFieldsServiceInterface {
  /**
   * Fields to set up tenant to the payment gateway.
   */
  getSetupFields: () => HtmlFields;
  /**
   * Fields to set up tenant to the payment gateway.
   */
  getManageFields: () => HtmlFields;
}

/**
 * On boarding the account service to implement.
 */
export interface SetupTenantServiceInterface {
  /**
   * Retrieves the payment gateway details for the given account.
   */
  registerPaymentGatewayAccountDetails: (params: {
    [any: string]: number | string;
  }) => Promise<PaymentGatewayConfig>;
  /**
   * Updates the payment gateway details for the given account.
   */
  updatePaymentGatewayAccountDetails: (params: {
    [any: string]: number | string;
  }) => Promise<PaymentGatewayConfig>;
}
