import { Test, TestingModule } from '@nestjs/testing';
import { NonSupportedByPaymentGateway } from '../errors/non-supported-by-payment-gateway';
import { CreatePaymentsDto } from './dto/create-payments.dto';
import { GetPaymentDto } from './dto/get-payment.dto';
import { ReconcilePaymentsDto } from './dto/reconcile-payments.dto';
import { RefundPaymentsDto } from './dto/refund-payments.dto';
import { VoidPaymentsDto } from './dto/void-payments.dto';
import { PaymentsService } from './payments.service';

describe('PaymentsService', () => {
  let service: PaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentsService],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create payments with correct payment params', () => {
    //TODO: update the argument to have the corrected parameters in implementation
    const createPaymentsDto: CreatePaymentsDto = new CreatePaymentsDto();
    expect(service.create(createPaymentsDto)).rejects.toThrowError(
      NonSupportedByPaymentGateway,
    );
  });

  it('should get payments with correct payment params', () => {
    //TODO: update the argument to have the corrected parameters in implementation
    const getPaymentDto: GetPaymentDto = new GetPaymentDto();
    expect(service.get(getPaymentDto)).rejects.toThrowError(
      NonSupportedByPaymentGateway,
    );
  });

  it('should reconcile payments', () => {
    //TODO: update the argument to have the corrected parameters in implementation
    const reconcilePaymentsDto: ReconcilePaymentsDto =
      new ReconcilePaymentsDto();
    expect(service.reconcile(reconcilePaymentsDto)).rejects.toThrowError(
      NonSupportedByPaymentGateway,
    );
  });

  it('should refund the payments', () => {
    //TODO: update the argument to have the corrected parameters in implementation
    const refundPaymentsDto: RefundPaymentsDto = new RefundPaymentsDto();
    expect(service.refund(refundPaymentsDto)).rejects.toThrowError(
      NonSupportedByPaymentGateway,
    );
  });

  it('should void the payments', () => {
    //TODO: update the argument to have the corrected parameters in implementation
    const voidPaymentsDto: VoidPaymentsDto = new VoidPaymentsDto();
    expect(service.void(voidPaymentsDto)).rejects.toThrowError(
      NonSupportedByPaymentGateway,
    );
  });
});
