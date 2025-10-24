import {
  CustomerPaymentMethod,
  PaymentMethod,
} from '../payment-methods/payment-methods.interface';
import { v4 as uuidv4 } from 'uuid';
import { mapError } from './sample-payments-sdk';

export function convertSampleAddPaymentsMethodToOrdway(
  response: any,
  customerUid: string = undefined,
  uuid = uuidv4(),
): CustomerPaymentMethod {
  const paymentMethod = convertSamplePaymentsMethodToOrdway(response, uuid);
  return {
    gateway_id: customerUid,
    method: paymentMethod,
  };
}

export function convertSamplePaymentsMethodToOrdway(
  response: any,
  uuid = uuidv4(),
): PaymentMethod {
  if (response.success === false) {
    throw mapError({
      status: response?.statusCode,
      data: response?.error?.messages,
    });
  }

  const {
    token: token_id,
    card,
    ach,
    isDefault,
    type,
    ...responseRest
  } = response ?? {};

  let last4, brand, month, year, token_type, expiry, method_type, status;
  switch (type) {
    case 'ach': {
      ({
        expiry: expiry = '',
        lastFour: last4,
        bankAccountType: token_type,
      } = ach ?? {});
      brand = 'Bank Account';
      method_type = 1;
      status = ach.verified == true ? 'verified' : 'unverified';
      break;
    }
    case 'card':
      ({ brand, expiry, lastFour: last4, tokenType: token_type } = card ?? {});
      ({ month, year } = expiry ?? {});
      method_type = 0;
      status = 'verified';
      break;
  }
  return {
    uuid,
    name: responseRest?.billingDetails?.name,
    last4,
    method_type: method_type,
    token_id,
    brand,
    month,
    year,
    status,
    opt: {
      ...responseRest,
      token_type,
      type,
    },
    default: isDefault,
  };
}
export function convertToBool(stringBool: string): boolean {
  return stringBool == 'false' ? false : !!stringBool;
}