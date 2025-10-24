import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { AddPaymentMethodParamsDto } from './add-payment-method-params.dto';
import { GetCustomerPaymentMethodDto } from './get-customer-payment-method.dto';

export class AddPaymentMethodDto extends GetCustomerPaymentMethodDto {
  @ApiProperty({
    title: 'Parameter for payment method creation for the payment gateway',
    type: AddPaymentMethodParamsDto,
  })
  @Type(() => AddPaymentMethodParamsDto)
  params: AddPaymentMethodParamsDto;
}
