import { AddressDto } from 'src/payment-methods/dto/add-payment-method-params.dto';
import { mapError } from '../utils/sample-payments-sdk';
import { PaymentMethod } from 'src/payment-methods/payment-methods.interface';
export class Validation {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  address_fields = new Map<string, string>([
    ['country', 'country'],
    ['line1', 'address'],
    ['state', 'state'],
    ['city', 'city'],
    ['postal', 'zipcode'],
  ]);

  validateField(attr_name: string, field: string, object_name: string) {
    const message =
      object_name == 'ach'
        ? `${attr_name} can't be empty. please check and try again`
        : ` Please make sure valid email, billing address including city, state, zip, country is present for the billing contact`;
    if (!field) {
      throw mapError({
        status: 400,
        messages: message,
      });
    }
  }

  validateAddressFields(address: AddressDto, object_name: string) {
    for (const [key, value] of Object.entries(address)) {
      const field = this.address_fields.get(key);
      field && this.validateField(field, value, object_name);
    }
  }

  validatePaymentMethodStatus(paymentMethod: PaymentMethod) {
    if (paymentMethod.status == 'unverified') {
      throw mapError({
        status: 400,
        messages: `The customer's bank account must be verified in order to create an ACH payment`,
      });
    }
  }
}
