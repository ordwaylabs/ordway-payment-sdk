import { Injectable, Logger } from '@nestjs/common';
import { CreatePaymentsDto } from './dto/create-payments.dto';
import { GetPaymentDto } from './dto/get-payment.dto';
import { ReconcilePaymentsDto } from './dto/reconcile-payments.dto';
import { RefundPaymentsDto } from './dto/refund-payments.dto';
import { PaymentResponse, PaymentServiceInterface } from './payments.interface';
import { PaymentMethod } from '../payment-methods/payment-methods.interface';
import { inspect } from 'util';
import {
  mapError,
  RequestTypes,
  sendSampleRequest,
} from '../utils/sample-payments-sdk';
import { countryToAlpha3 } from 'country-to-iso';
import { Validation } from '../validations/validation';
@Injectable()
export class PaymentsService implements PaymentServiceInterface {
  async get(
    getPaymentDto: GetPaymentDto,
    testMode = false,
  ): Promise<PaymentResponse> {
    const response = await sendSampleRequest(
      RequestTypes.get,
      `your_sdk_url`,
      testMode,
    );

    return this.convertSamplePayPaymentToOrdwayPayment(response);
  }

  async create(
    params: CreatePaymentsDto,
    testMode = false,
  ): Promise<PaymentResponse> {
    const { method: paymentMethod } = params;
    const validator = new Validation();
    if (paymentMethod.brand == 'Bank Account') {
      validator.validatePaymentMethodStatus(paymentMethod);
    }

    Logger.debug(`Creating payments ${inspect(params)}`);

    let data: any = this.getParamsForPayments(params);
    const { options } = params;
    const reference = {
      customerRef: options['ordway_customer_id'],
      referenceNo: options['ordway_payment_id'],
    };

    data = { ...data, reference };

    if (params?.customer_config) {
      const { name, email } = params?.customer_config;
      const [address] = params?.customer_config?.addresses;
      const { postal: postalCode, country, ...addressRest } = address ?? {};
      const alpha3 = countryToAlpha3(country);
      if (!alpha3) {
        throw mapError({
          status: 400,
          messages: `Failed to convert country:${country} to Alpha3 code.`,
        });
      }
      const customer = {
        name,
        email,
        address: {
          ...addressRest,
          postalCode,
          country: alpha3,
        },
      };

      data = { ...data, customer };
    }

    const response = await sendSampleRequest(
      RequestTypes.post,
      `your_sdk_url`,
      testMode,
      data,
    );

    const result = this.convertSamplePayPaymentToOrdwayPayment(
      response,
      paymentMethod,
    );
    Logger.debug(
      `Payment Response-${this.getAccountIdUrl(params.gateway_config)}--${
        params?.customer_config?.gateway_id
      } : ${JSON.stringify(result)}`,
    );
    return result;
  }

  async refund(
    params: RefundPaymentsDto,
    testMode = false,
  ): Promise<PaymentResponse> {
    let refund;
    try {
      refund = await this.reversePayment(
        { ...params, req_type: 'refund' },
        testMode,
      );
    } catch (e) {
      if (e?.error?.messages?.includes?.('Invalid Payment ID'))
        refund = await this.reversePayment(
          { ...params, req_type: 'void' },
          testMode,
        );
      else throw e;
    }

    return refund;
  }

  async void(
    params: RefundPaymentsDto,
    testMode = false,
  ): Promise<PaymentResponse> {
    let voidResponse;
    try {
      voidResponse = await this.reversePayment(
        { ...params, req_type: 'void' },
        testMode,
      );
    } catch (e) {
      if (e?.error?.messages?.include?.('Invalid Payment ID'))
        voidResponse = await this.reversePayment(
          { ...params, req_type: 'refund' },
          testMode,
        );
      else throw e;
    }
    return voidResponse;
  }

  async reconcile(
    params: ReconcilePaymentsDto,
    testMode = false,
  ): Promise<PaymentResponse[]> {
    const { to, from, limit, offset } = params;

    let responses = [];
    Logger.debug(`Payments ids ${inspect(params.payments)}`);
    if (params.payments?.length !== 0 && params.payments !== undefined) {
      for (const paymentId of params.payments) {
        const resp = await sendSampleRequest(
          RequestTypes.get,
          `your_sdk_url`,
          testMode,
        );
        responses.push(resp);
      }
    } else if (
      params.timeout_payments?.length !== 0 &&
      params.timeout_payments !== undefined
    ) {
      for (const timeout_payment of params.timeout_payments) {
        const { amount, reference } = JSON.parse(timeout_payment);
        Logger.log(reference);
        const resp = await sendSampleRequest(
          RequestTypes.get,
          `your_sdk_url`,
          testMode,
        );
        if (resp?.length > 0) {
          responses.push(resp.shift());
        }
      }
    } else {
      responses = await sendSampleRequest(
        RequestTypes.get,
        `your_sdk_url`,
        testMode,
        {
          to,
          from,
          limit,
          offset,
        },
      );
    }

    const results = responses?.map((response) =>
      this.convertSamplePayPaymentToOrdwayPayment(response),
    );
    Logger.debug(
      `Reconcile Payments Response-${this.getAccountIdUrl(
        params.gateway_config,
      )} : ${JSON.stringify(results)}`,
    );
    return results;
  }

  private convertSamplePayPaymentToOrdwayPayment(
    samplePayResponse: any,
    paymentMethod: PaymentMethod = null,
    method: 'void' | 'refund' = undefined,
  ): PaymentResponse {
    if (samplePayResponse.success === false) {
      throw mapError({
        status: samplePayResponse?.statusCode,
        data: samplePayResponse?.error?.messages,
      });
    }

    const {
      amount,
      feeAmount: fees,
      approved,
      paymentId: transaction_ref,
      type,
      status,
      reference,
    } = samplePayResponse;

    let responseStatus = this.getPaymentStatus(type, status);
    const paymentResponse: PaymentResponse = {
      amount,
      fees,
      gateway_resp: samplePayResponse,
      method: paymentMethod,
      status: responseStatus,
      transaction_ref,
      reference,
    };

    if (!approved) {
      paymentResponse['message'] = samplePayResponse.sentToBank
        ? samplePayResponse.bankResponse?.message
        : samplePayResponse.sampleResponse?.message;
    }
    if (method) {
      paymentResponse['response_note'] = method;
    }

    return paymentResponse;
  }

  private async reversePayment(params, testMode) {
    const {
      transaction_ref: payment_id,
      method: paymentMethod,
      req_type,
      gateway_config: gatewayConfig,
    } = params;

    const data: any = this.getParamsForPaymentsReverse(params);

    const response = await sendSampleRequest(
      RequestTypes.post,
      `your_sdk_url`,
      testMode,
      data,
    );

    const result = this.convertSamplePayPaymentToOrdwayPayment(
      response,
      paymentMethod,
      req_type,
    );
    Logger.debug(
      `Refund-${this.getAccountIdUrl(
        gatewayConfig,
      )}--${payment_id}} : ${JSON.stringify(result)}`,
    );
    return result;
  }

  private getParamsForPaymentsReverse(params) {
    const {
      options: { authorization, reference },
      reason,
    } = params;

    const data: any = this.getParamsForPayments(params);

    return {
      ...data,
      authorization,
      reference,
    };
  }

  private getParamsForPayments(params) {
    const {
      method: paymentMethod,
      amount,
      statement_descriptor: feeAmount,
    } = params;

    let response: any = {
      amount,
    };
    if (paymentMethod) {
      response = {
        ...response,
        paymentMethod: {
          token: paymentMethod?.token_id,
        } as any,
      };
    }
    return response;
  }

  private getAccountIdUrl(gatewayConfig) {
    return `/account/${gatewayConfig?.tenant_config?.id}/`;
  }

  private getPaymentStatus(type: string, status: string): string {
    if (type == 'ach' && status === 'completed') {
      return 'pending' as const;
    } else if (type === 'ach' && status === 'settled') {
      return 'processed' as const;
    } else if (type === 'payment' && status === 'completed') {
      return 'processed' as const;
    } else if (
      (type == 'void' || type === 'refund') &&
      status === 'completed'
    ) {
      return 'refunded' as const;
    } else {
      return 'failed' as const;
    }
  }
}
