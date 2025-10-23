import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { VerifyMicroDepositsParamsDto } from './verify-micro-deposits-params.dto';
import { GetCustomerPaymentMethodDto } from './get-customer-payment-method.dto';
export class VerifyMicroDepositsDto extends GetCustomerPaymentMethodDto {
  @ApiProperty({
    title: 'Parameter for micro deposits verification for the payment method',
    type: VerifyMicroDepositsParamsDto,
  })
  @Type(() => VerifyMicroDepositsParamsDto)
  params: VerifyMicroDepositsParamsDto;
}
