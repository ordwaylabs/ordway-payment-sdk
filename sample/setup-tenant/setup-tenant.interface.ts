import { HtmlFields } from '../utils/html-field.interface';
import { PaymentGatewayConfig } from '../utils/payment-gateway-config.interface';
import { SectionField } from '../utils/section-field.interface';

/**
 * On boarding fields for html rendering.
 */
export interface SetupTenantFieldsServiceInterface {
  /**
   * Fields to set up tenant to the payment gateway.
   */
  getSetupFields: () => SectionField;
  /**
   * Fields to set up tenant to the payment gateway.
   */
  getManageFields: () => SectionField;
}

/**
 * On boarding the account service to implement.
 */
export interface SetupTenantServiceInterface<Create, Update> {
  /**
   * Retrieves the payment gateway details for the given account.
   */
  registerPaymentGatewayAccountDetails: (
    params: Create,
    testMode: boolean,
  ) => Promise<PaymentGatewayConfig>;
  /**
   * Updates the payment gateway details for the given account.
   */
  updatePaymentGatewayAccountDetails: (
    params: Update,
    testMode: boolean,
  ) => Promise<PaymentGatewayConfig>;
}
