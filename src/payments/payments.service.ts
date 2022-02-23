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
  get(PaymentParam: GetPaymentDto): PaymentResponse {
    throw new NonSupportedByPaymentGateway();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(params: CreatePaymentsDto): PaymentResponse {
    throw new NonSupportedByPaymentGateway();
  }

  refund(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: RefundPaymentsDto,
  ): PaymentResponse {
    throw new NonSupportedByPaymentGateway();
  }

  void(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: VoidPaymentsDto,
  ): PaymentResponse {
    throw new NonSupportedByPaymentGateway();
  }

  reconcile(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: ReconcilePaymentsDto,
  ): PaymentResponse {
    throw new NonSupportedByPaymentGateway();
  }
}
