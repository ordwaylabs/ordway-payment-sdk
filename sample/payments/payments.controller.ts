import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePaymentsDto } from './dto/create-payments.dto';
import { GetPaymentDto } from './dto/get-payment.dto';
import { ReconcilePaymentsDto } from './dto/reconcile-payments.dto';
import { RefundPaymentsDto } from './dto/refund-payments.dto';
import { VoidPaymentsDto } from './dto/void-payments.dto';
import { PaymentsService } from './payments.service';
import { convertToBool } from '../utils/convert-utilities';

@ApiTags('Payments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('/get_payment')
  get(
    @Body() getPaymentDto: GetPaymentDto,
    @Headers('x-test-mode') testMode: string,
  ) {
    return this.paymentsService.get(getPaymentDto, convertToBool(testMode));
  }

  @Post('/create_payment')
  create(
    @Body() createPaymentDto: CreatePaymentsDto,
    @Headers('x-test-mode') testMode: string,
  ) {
    return this.paymentsService.create(
      createPaymentDto,
      convertToBool(testMode),
    );
  }

  @Post('/refund_payment')
  refund(
    @Body() refundPaymentDto: RefundPaymentsDto,
    @Headers('x-test-mode') testMode: string,
  ) {
    return this.paymentsService.refund(
      refundPaymentDto,
      convertToBool(testMode),
    );
  }

  @Post('/void_payment')
  void(
    @Body() voidPaymentDto: VoidPaymentsDto,
    @Headers('x-test-mode') testMode: string,
  ) {
    return this.paymentsService.void(voidPaymentDto, convertToBool(testMode));
  }

  @Post('/reconcile_payment')
  reconcile(
    @Body() reconcilePaymentDto: ReconcilePaymentsDto,
    @Headers('x-test-mode') testMode: string,
  ) {
    return this.paymentsService.reconcile(
      reconcilePaymentDto,
      convertToBool(testMode),
    );
  }
}
