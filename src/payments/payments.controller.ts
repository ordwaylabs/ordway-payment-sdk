import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePaymentsDto } from './dto/create-payments.dto';
import { GetPaymentDto } from './dto/get-payment.dto';
import { ReconcilePaymentsDto } from './dto/reconcile-payments.dto';
import { RefundPaymentsDto } from './dto/refund-payments.dto';
import { VoidPaymentsDto } from './dto/void-payments.dto';
import { PaymentsService } from './payments.service';

@ApiTags('Payments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('/get_payment')
  get(@Body() getPaymentDto: GetPaymentDto) {
    return this.paymentsService.get(getPaymentDto);
  }

  @Post('/create_payment')
  create(@Body() createPaymentDto: CreatePaymentsDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Post('/refund_payment')
  refund(@Body() refundPaymentDto: RefundPaymentsDto) {
    return this.paymentsService.refund(refundPaymentDto);
  }

  @Post('/void_payment')
  void(@Body() voidPaymentDto: VoidPaymentsDto) {
    return this.paymentsService.void(voidPaymentDto);
  }

  @Post('/reconcile_payment')
  reconcile(@Body() reconcilePaymentDto: ReconcilePaymentsDto) {
    return this.paymentsService.reconcile(reconcilePaymentDto);
  }
}
