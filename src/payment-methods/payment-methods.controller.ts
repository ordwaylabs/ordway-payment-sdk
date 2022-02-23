import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AddPaymentMethodDto } from './dto/add-payment-method.dto';
import { DeletePaymentMethodDto } from './dto/delete-payment-method.dto';
import { GetAddPaymentMethodFormDto } from './dto/get-add-payment-method-form.dto';
import { GetCustomerPaymentMethodDto } from './dto/get-customer-payment-method.dto';
import { GetPaymentMethodDto } from './dto/get-payment-method.dto';
import { PaymentMethodsService } from './payment-methods.service';

@ApiTags('Payment Methods')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('payment-methods')
export class PaymentMethodsController {
  constructor(private readonly paymentMethodsService: PaymentMethodsService) {}

  @Post('get_customer_payment_method')
  getCustomerPaymentMethod(
    @Body() getCustomerPaymentMethodDto: GetCustomerPaymentMethodDto,
  ) {
    this.paymentMethodsService.getCustomerPaymentMethods(
      getCustomerPaymentMethodDto,
    );
  }

  @Post('get_payment_method')
  getPaymentMethodDetails(@Body() getPaymentMethodDto: GetPaymentMethodDto) {
    this.paymentMethodsService.getPaymentMethodDetails(getPaymentMethodDto);
  }

  @Post('get_add_cc_method_form')
  getAddCCMethodForm(
    @Body() getAddPaymentMethodFormDto: GetAddPaymentMethodFormDto,
  ) {
    this.paymentMethodsService.getAddCCMethodForm(getAddPaymentMethodFormDto);
  }

  @Post('get_add_ach_method_form')
  getAddACHMethodForm(
    @Body() getAddPaymentMethodFormDto: GetAddPaymentMethodFormDto,
  ) {
    this.paymentMethodsService.getAddACHMethodForm(getAddPaymentMethodFormDto);
  }

  @Post('add_payment_method')
  addPaymentMethod(@Body() addPaymentMethodDto: AddPaymentMethodDto) {
    this.paymentMethodsService.addPaymentMethod(addPaymentMethodDto);
  }

  @Post('update_payment_method')
  updatePaymentMethod(@Body() updatePaymentMethodDto: AddPaymentMethodDto) {
    this.paymentMethodsService.updatePaymentMethod(updatePaymentMethodDto);
  }

  @Post('delete_payment_method')
  deletePaymentMethod(@Body() deletePaymentMethodDto: DeletePaymentMethodDto) {
    this.paymentMethodsService.deletePaymentMethod(deletePaymentMethodDto);
  }
}
