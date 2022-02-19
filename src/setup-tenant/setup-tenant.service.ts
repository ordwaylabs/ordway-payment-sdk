import { Injectable } from '@nestjs/common';
import { PaymentGatewayConfig } from 'src/utils/payment-gateway-config.interface';
import { HtmlFields } from 'src/utils/html-field.interface';
import {
  SetupTenantFieldsServiceInterface,
  SetupTenantServiceInterface,
} from './setup-tenant.interface';
import { NonSupportedByPaymentGateway } from 'src/errors/non-supported-by-payment-gateway';

@Injectable()
export class SetupTenantService
  implements SetupTenantServiceInterface, SetupTenantFieldsServiceInterface
{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  registerPaymentGatewayAccountDetails(params: {
    [any: string]: string | number;
  }): PaymentGatewayConfig {
    throw new NonSupportedByPaymentGateway();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updatePaymentGatewayAccountDetails(params: {
    [any: string]: string | number;
  }): PaymentGatewayConfig {
    throw new NonSupportedByPaymentGateway();
  }

  getSetupFields(): HtmlFields {
    throw new NonSupportedByPaymentGateway();
  }

  getManageFields(): HtmlFields {
    throw new NonSupportedByPaymentGateway();
  }
}
