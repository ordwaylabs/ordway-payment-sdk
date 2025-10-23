import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AddPaymentMethodDto } from './dto/add-payment-method.dto';
import { AttachPaymentMethodDto } from './dto/attach-payment-method.dto';
import { DeletePaymentMethodDto } from './dto/delete-payment-method.dto';
import { GetAddPaymentMethodFormDto } from './dto/get-add-payment-method-form.dto';
import { GetCustomerPaymentMethodDto } from './dto/get-customer-payment-method.dto';
import { GetPaymentMethodDto } from './dto/get-payment-method.dto';
import { PaymentMethodsService } from './payment-methods.service';
import { convertToBool } from '../utils/convert-utilities';
import { VerifyMicroDepositsDto } from './dto/verify-micro-desposits.dto';

@ApiTags('Payment Methods')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('payment_methods')
export class PaymentMethodsController {
  constructor(private readonly paymentMethodsService: PaymentMethodsService) {}

  @ApiExcludeEndpoint()
  @Post('get_customer_payment_method')
  getCustomerPaymentMethod(
    @Body() getCustomerPaymentMethodDto: GetCustomerPaymentMethodDto,
    @Headers('x-test-mode') testMode: string,
  ) {
    return this.paymentMethodsService.getCustomerPaymentMethods(
      getCustomerPaymentMethodDto,
      convertToBool(testMode),
    );
  }

  @ApiExcludeEndpoint()
  @Post('get_payment_method')
  getPaymentMethodDetails(
    @Body() getPaymentMethodDto: GetPaymentMethodDto,
    @Headers('x-test-mode') testMode: string,
  ) {
    return this.paymentMethodsService.getPaymentMethodDetails(
      getPaymentMethodDto,
      convertToBool(testMode),
    );
  }

  @ApiExcludeEndpoint()
  @Post('get_add_cc_method_form')
  getAddCCMethodForm(
    @Body() getAddPaymentMethodFormDto: GetAddPaymentMethodFormDto,
    @Headers('x-test-mode') testMode: string,
  ) {
    return this.paymentMethodsService.getAddCCMethodForm(
      getAddPaymentMethodFormDto,
      convertToBool(testMode),
    );
  }

  @ApiExcludeEndpoint()
  @Post('get_add_ach_method_form')
  getAddACHMethodForm(
    @Body() getAddPaymentMethodFormDto: GetAddPaymentMethodFormDto,
    @Headers('x-test-mode') testMode: string,
  ) {
    return this.paymentMethodsService.getAddACHMethodForm(
      getAddPaymentMethodFormDto,
      convertToBool(testMode),
    );
  }

  @Post('add_payment_method')
  addPaymentMethod(
    @Body() addPaymentMethodDto: AddPaymentMethodDto,
    @Headers('x-test-mode') testMode: string,
  ) {
    return this.paymentMethodsService.addPaymentMethod(
      addPaymentMethodDto,
      convertToBool(testMode),
    );
  }

  @Post('verify_micro_deposits')
  verifyMicroDeposits(
    @Body() verifyMicroDepositsDto: VerifyMicroDepositsDto,
    @Headers('x-test-mode') testMode: string,
  ) {
    return this.paymentMethodsService.verifyMicroDeposits(
      verifyMicroDepositsDto,
      convertToBool(testMode),
    );
  }

  @Post('delete_payment_method')
  deletePaymentMethod(
    @Body() deletePaymentMethodDto: DeletePaymentMethodDto,
    @Headers('x-test-mode') testMode: string,
  ) {
    return this.paymentMethodsService.deletePaymentMethod(
      deletePaymentMethodDto,
      convertToBool(testMode),
    );
  }
}
