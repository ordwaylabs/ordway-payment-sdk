import { Injectable } from '@nestjs/common';
import { NonSupportedByPaymentGateway } from '../errors/non-supported-by-payment-gateway';
import { CreatePaymentsDto } from './dto/create-payments.dto';
import { GetPaymentDto } from './dto/get-payment.dto';
import { ReconcilePaymentsDto } from './dto/reconcile-payments.dto';
import { RefundPaymentsDto } from './dto/refund-payments.dto';
import { VoidPaymentsDto } from './dto/void-payments.dto';
import { PaymentResponse, PaymentServiceInterface } from './payments.interface';

@Injectable()
export class PaymentsService implements PaymentServiceInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get(PaymentParam: GetPaymentDto): Promise<PaymentResponse> {
    throw new NonSupportedByPaymentGateway();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(params: CreatePaymentsDto): Promise<PaymentResponse> {
    throw new NonSupportedByPaymentGateway();
  }

  async refund(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: RefundPaymentsDto,
  ): Promise<PaymentResponse> {
    throw new NonSupportedByPaymentGateway();
  }

  async void(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: VoidPaymentsDto,
  ): Promise<PaymentResponse> {
    throw new NonSupportedByPaymentGateway();
  }

  async reconcile(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: ReconcilePaymentsDto,
  ): Promise<PaymentResponse> {
    throw new NonSupportedByPaymentGateway();
  }
}
