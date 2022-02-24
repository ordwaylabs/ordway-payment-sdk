import { Injectable } from '@nestjs/common';
import { PaymentGatewayConfig } from '../utils/payment-gateway-config.interface';
import { HtmlField, HtmlFields } from '../utils/html-field.interface';
import {
  SetupTenantFieldsServiceInterface,
  SetupTenantServiceInterface,
} from './setup-tenant.interface';
import { NonSupportedByPaymentGateway } from '../errors/non-supported-by-payment-gateway';

import setupFields from '../../setup-files/setup-fields.json';
import manageFields from '../../setup-files/manage-fields.json';

@Injectable()
export class SetupTenantService
  implements SetupTenantServiceInterface, SetupTenantFieldsServiceInterface
{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async registerPaymentGatewayAccountDetails(params: {
    [any: string]: string | number;
  }): Promise<PaymentGatewayConfig> {
    throw new NonSupportedByPaymentGateway();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async updatePaymentGatewayAccountDetails(params: {
    [any: string]: string | number;
  }): Promise<PaymentGatewayConfig> {
    throw new NonSupportedByPaymentGateway();
  }

  getSetupFields(): HtmlFields {
    return {
      fields: setupFields as HtmlField[],
    };
  }

  getManageFields(): HtmlFields {
    return {
      fields: manageFields as HtmlField[],
    };
  }
}
