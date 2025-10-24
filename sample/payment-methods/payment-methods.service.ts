import { Injectable, Logger } from '@nestjs/common';
import {
  convertSampleAddPaymentsMethodToOrdway,
  convertSamplePaymentsMethodToOrdway,
} from '../utils/convert-utilities';
import { countryToAlpha3 } from 'country-to-iso';
import { NonSupportedByPaymentGateway } from '../errors/non-supported-by-payment-gateway';
import { HtmlFields } from '../utils/html-field.interface';
import { AddPaymentMethodDto } from './dto/add-payment-method.dto';
import { DeletePaymentMethodDto } from './dto/delete-payment-method.dto';
import { GetAddPaymentMethodFormDto } from './dto/get-add-payment-method-form.dto';
import { GetCustomerPaymentMethodDto } from './dto/get-customer-payment-method.dto';
import { GetPaymentMethodDto } from './dto/get-payment-method.dto';

import {
  CustomerPaymentMethod,
  DeletePaymentMethodResponse,
  PaymentMethod,
  PaymentMethodsServiceInterface,
} from './payment-methods.interface';
import { CustomerService } from '../customer/customer.service';
import {
  RequestTypes,
  mapError,
  sendSampleRequest,
} from '../utils/sample-payments-sdk';
import { AttachPaymentMethodDto } from './dto/attach-payment-method.dto';
import {
  CreateCustomerDto,
  CustomerAddressDto,
} from '../customer/dto/create-customer.dto';
import { VerifyMicroDepositsDto } from './dto/verify-micro-desposits.dto';
import { Validation } from '../validations/validation';

@Injectable()
export class PaymentMethodsService implements PaymentMethodsServiceInterface {
  constructor(private readonly customerService: CustomerService) {}

  async getCustomerPaymentMethods(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: GetCustomerPaymentMethodDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    testMode = false,
  ): Promise<PaymentMethod[]> {
    const {
      tenant_config: { id: accountId },
    } = params.gateway_config;
    const response = await sendSampleRequest(
      RequestTypes.get,
      `your_sdk_url`,
      testMode,
    );

    const result = response.map((res) => {
      return convertSamplePaymentsMethodToOrdway(res);
    });
    Logger.debug(
      `customer payment methods Response-${accountId}--${
        params?.customer_config?.gateway_id
      } : ${JSON.stringify(result)}`,
    );
    return result;
  }

  async getPaymentMethodDetails(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: GetPaymentMethodDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    testMode = false,
  ): Promise<PaymentMethod> {
    const {
      tenant_config: { id: accountId },
    } = params.gateway_config;

    const response = await sendSampleRequest(
      RequestTypes.get,
      `your_sdk_url`,
      testMode,
    );

    return convertSamplePaymentsMethodToOrdway(response);
  }

  getAddCCMethodForm(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _params: GetAddPaymentMethodFormDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _testMode = false,
  ): HtmlFields {
    throw new NonSupportedByPaymentGateway();
  }

  getAddACHMethodForm(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _params: GetAddPaymentMethodFormDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _testMode = false,
  ): HtmlFields {
    throw new NonSupportedByPaymentGateway();
  }

  async verifyMicroDeposits(
    verifyMicroDepositsDto: VerifyMicroDepositsDto,
    testMode = false,
  ): Promise<CustomerPaymentMethod> {
    const {
      tenant_config: { id: accountId },
    } = verifyMicroDepositsDto.gateway_config;
    const customerGatewayId =
      verifyMicroDepositsDto.customer_config?.gateway_id;

    const response = await sendSampleRequest(
      RequestTypes.post,
      `your_sdk_url`,
      testMode,
      {
        amount1: verifyMicroDepositsDto.params.amount1,
        amount2: verifyMicroDepositsDto.params.amount2,
      },
    );

    if (response?.ach) {
      response.ach = {
        ...response.ach,
        lastFour: `****${response.ach.lastFour}`,
      };
    }

    Logger.debug(`Sample Pay response: ${JSON.stringify(response)}`);
    const finalResponse = convertSampleAddPaymentsMethodToOrdway(
      { token: verifyMicroDepositsDto.params.token, ...response },
      customerGatewayId,
    );
    Logger.debug(`To Ordway: ${JSON.stringify(finalResponse)}`);
    return finalResponse;
  }

  async addPaymentMethod(
    addPaymentMethodDto: AddPaymentMethodDto,
    testMode = false,
  ): Promise<CustomerPaymentMethod> {
    const {
      tenant_config: { id: accountId },
    } = addPaymentMethodDto.gateway_config;

    // In case customer is not present in the params request, then create the customer first
    // and then add the create the payment method.
    let customerGatewayId = addPaymentMethodDto.customer_config?.gateway_id;
    if (!customerGatewayId) {
      let customerAddressDto: CustomerAddressDto = new CustomerAddressDto();
      const createCustomerDto: CreateCustomerDto = new CreateCustomerDto();
      //createCustomerDto.name = addPaymentMethodDto.customer_config?.uuid || uuidv4();
      createCustomerDto.name = addPaymentMethodDto.customer_config?.name;
      createCustomerDto.email = addPaymentMethodDto.customer_config?.email;
      createCustomerDto.phone = addPaymentMethodDto.customer_config?.phone;
      createCustomerDto.gateway_config = addPaymentMethodDto.gateway_config;
      const addresses = [];
      addPaymentMethodDto.customer_config?.addresses?.forEach((address) => {
        customerAddressDto = {
          city: address?.city,
          state: address?.state,
          country: address?.country,
          line1: address?.line1,
          line2: address?.line2,
          label: address?.label,
          postal: address?.postal,
        };
        addresses.push(customerAddressDto);
      });
      createCustomerDto.addresses = addresses;
      const customer = await this.customerService.create(
        createCustomerDto,
        testMode,
      );
      customerGatewayId = customer.gateway_id;
      if (addPaymentMethodDto.customer_config) {
        addPaymentMethodDto.customer_config.gateway_id = customerGatewayId;
      } else {
        addPaymentMethodDto.customer_config = {
          uuid: createCustomerDto.name,
          name: createCustomerDto.name,
          email: createCustomerDto.email,
          phone: createCustomerDto.phone,
          gateway_id: customerGatewayId,
        };
      }
    }

    const response = await sendSampleRequest(
      RequestTypes.post,
      `your_sdk_url`,
      testMode,
      PaymentMethodsService.getTokenizeParams(addPaymentMethodDto),
    );

    if (response.ach) {
      response.ach = {
        ...response.ach,
        lastFour: `****${addPaymentMethodDto.params.ach.account_number.slice(
          -4,
        )}`,
      };
    }
    const attachPaymentMethod = {
      ...addPaymentMethodDto,
      token: response.token,
      default: addPaymentMethodDto.params.default || false,
    };
    const attachedResponse = await this.attachPaymentMethod(
      attachPaymentMethod,
      testMode,
    );
    if (!attachedResponse) {
      throw mapError({
        status: 400,
        messages: `Payment method ****${
          response?.card?.lastFour || response?.ach?.lastFour
        } already added to the customer`,
      });
    }

    const finalResponse = { ...attachedResponse, ...response };
    const result = convertSampleAddPaymentsMethodToOrdway(
      finalResponse,
      customerGatewayId,
    );
    Logger.debug(
      `Payment Method Response-${accountId}--${
        addPaymentMethodDto.customer_config.gateway_id
      } : ${JSON.stringify(result)}`,
    );
    return result;
  }

  async deletePaymentMethod(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: DeletePaymentMethodDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    testMode = false,
  ): Promise<DeletePaymentMethodResponse> {
    const {
      tenant_config: { id: accountId },
    } = params.gateway_config;
    let uuids = [];
    if (params?.customer_config?.gateway_id) {
      for (const pm of params.methods) {
        await sendSampleRequest(
          RequestTypes.delete,
          `your_sdk_url`,
          testMode,
        );
        uuids.push(pm);
      }
      return { method_uids: uuids, status: 'succeeded' };
    }
  }

  async attachPaymentMethod(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: AttachPaymentMethodDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    testMode = false,
  ): Promise<PaymentMethod> {
    const {
      tenant_config: { id: accountId },
    } = params.gateway_config;

    return await sendSampleRequest(
      RequestTypes.post,
      `your_sdk_url`,
      testMode,
      {
        token: params.token,
        isDefault: params.default,
      },
    );
  }

  private static getTokenizeParams(
    addPaymentMethodDto: AddPaymentMethodDto,
  ): object {
    const validator = new Validation();
    let {
      card,
      customer: { address, phone, ...customerRest },
      type,
      ach,
    } = addPaymentMethodDto.params;

    let month, year, cvd, creditCardChopped;
    if (type == 'Credit Card' || type == 'card') {
      ({ month, year, cvd, ...creditCardChopped } = card);
      type = 'card';
    } else if (type == 'Bank Account') {
      type = 'ach';
    }
    const { postal: postalCode, country, ...addressRest } = address ?? {};
    const alpha3 = countryToAlpha3(country);
    if (!alpha3) {
      throw mapError({
        status: 400,
        messages: `Failed to convert country:${country} to Alpha3 code.`,
      });
    }
    const result = {
      type,
      billingDetails: {
        ...customerRest,
        address: {
          ...addressRest,
          postalCode,
          country: alpha3,
        },
      },
      card: {
        cvc: cvd,
        ...creditCardChopped,
        expiry: {
          month: month,
          year: year,
        },
      },
      ach: ach,
    };
    Logger.log(`validating payment method name: ${result.billingDetails.name}`);
    validator.validateField('name', result.billingDetails.name, type);
    Logger.log(`validating payment method address: ${address}`);
    if (type == 'card' || ach.plaid_token) {
      validator.validateAddressFields(address, 'customer');
      if (type == 'ach') {
        Logger.log(
          `validating payment method email: ${result.billingDetails.email}`,
        );

        validator.validateField(
          'email',
          result.billingDetails.email,
          'customer',
        );
      }
    } else {
      validator.validateAddressFields(address, type);
      Logger.log(
        `validating payment method email: ${result.billingDetails.email}`,
      );
      validator.validateField('email', result.billingDetails.email, type);
    }
    return result;
  }
}
