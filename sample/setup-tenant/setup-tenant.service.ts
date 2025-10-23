import { Injectable } from '@nestjs/common';
import { PaymentGatewayConfig } from '../utils/payment-gateway-config.interface';
import { HtmlField, HtmlFields } from '../utils/html-field.interface';
import {
  SetupTenantFieldsServiceInterface,
  SetupTenantServiceInterface,
} from './setup-tenant.interface';

import setupFields from '../../setup-files/setup-fields.json';
import manageFields from '../../setup-files/manage-fields.json';
import { CreateSetupTenantDto } from './dto/create-setup-tenant.dto';
import { UpdateSetupTenantDto } from './dto/update-setup-tenant.dto';

import {
  getSamplePayOrganizationId,
  RequestTypes,
  sendSampleRequest,
} from '../utils/sample-payments-sdk';
import { pick } from 'lodash';
import { SectionField } from '../utils/section-field.interface';

@Injectable()
export class SetupTenantService
  implements
    SetupTenantServiceInterface<CreateSetupTenantDto, CreateSetupTenantDto>,
    SetupTenantFieldsServiceInterface
{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async registerPaymentGatewayAccountDetails(
    params: CreateSetupTenantDto,
    testMode: boolean,
  ): Promise<PaymentGatewayConfig> {
    const orgId = getSamplePayOrganizationId(testMode);
    const response: PaymentGatewayConfig = await sendSampleRequest(
      RequestTypes.get,
      `your_sdk_url`,
      testMode,
    );

    return pick(response, [
      'id',
      'type',
      'defaultMerchantId',
      'defaultTerminalId',
      'defaultTerminalGatewayId',
    ]);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async updatePaymentGatewayAccountDetails(
    params: UpdateSetupTenantDto,
    testMode: boolean,
  ): Promise<PaymentGatewayConfig> {
    return await this.registerPaymentGatewayAccountDetails(params, testMode);
  }

  getSetupFields(): SectionField {
    return setupFields;
  }

  getManageFields(): SectionField {
    return manageFields;
  }
}
