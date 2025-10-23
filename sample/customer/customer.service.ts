import { Injectable, Logger } from '@nestjs/common';
import {
  mapError,
  RequestTypes,
  sendSampleRequest,
} from '../utils/sample-payments-sdk';
import { Customer, PaymentGatewayCustomer } from './customer.interface';
import { GetCustomerPaymentMethodDto } from '../payment-methods/dto/get-customer-payment-method.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { countryToAlpha3 } from 'country-to-iso';
import { Validation } from '../validations/validation';

@Injectable()
export class CustomerService implements PaymentGatewayCustomer {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get(
    params: GetCustomerPaymentMethodDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    testMode = false,
  ): Promise<Customer> {
    const {
      tenant_config: { id: accountId },
    } = params.gateway_config;
    const { gateway_id: gatewayId, uuid: uuid } = params.customer_config;
    const response = await sendSampleRequest(
      RequestTypes.get,
      `your_sdk_url`,
      testMode,
    );

    return CustomerService.convertPaymentCustomerToOrdwayCustomer(
      response,
      uuid,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(
    customer: CreateCustomerDto,
    testMode = false,
  ): Promise<Customer> {
    const {
      tenant_config: { id: accountId },
    } = customer.gateway_config;
    const response = await sendSampleRequest(
      RequestTypes.post,
      `your_sdk_url`,
      testMode,
      CustomerService.createParams(customer),
    );
    Logger.log(`Customer creation Response: ${response}`);
    const result = CustomerService.convertPaymentCustomerToOrdwayCustomer(
      response,
      customer.uuid,
    );

    Logger.debug(
      `Customer create Response-${accountId}--${
        result.gateway_id
      } : ${JSON.stringify(result)}`,
    );

    return result;
  }

  private static createParams(customer) {
    const validator = new Validation();
    const { name, email, addresses: paramAddresses } = customer;
    Logger.log(`Customer: validating name: ${name}`);
    validator.validateField('name', name, 'customer');
    Logger.log(`Customer: validating email: ${email}`);
    validator.validateField('email', email, 'customer');
    const addresses =
      paramAddresses?.map((address) => {
        Logger.log(`Customer: validating address: ${address}`);
        validator.validateAddressFields(address, 'customer');
        const {
          postal: postalCode,
          country,
          default: isDefault,
          ...addr
        } = address;
        const alpha3 = countryToAlpha3(country);
        if (!alpha3) {
          throw mapError({
            status: 400,
            messages: `Failed to convert country:${country} to Alpha3 code.`,
          });
        }
        const result = {
          ...addr,
          isDefault,
          postalCode,
          country: alpha3,
        };
        return result;
      }) ?? [];

    return {
      name,
      email,
      addresses,
    };
  }
  private static convertPaymentCustomerToOrdwayCustomer(
    response,
    uuid,
  ): Customer {
    const { id, ...cust } = response;
    return { uuid: uuid, gateway_id: id, ...cust };
  }
}
