import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';
import { GetCustomerPaymentMethodDto } from './get-customer-payment-method.dto';

export class GetPaymentMethodDto extends GetCustomerPaymentMethodDto {
  @ApiProperty({
    title: 'Unique ID of Payment Method',
    type: 'string',
  })
  @IsString()
  method_uid: string;

  @ApiProperty({
    title: 'Payment method paramter',
    type: Object,
  })
  @IsObject()
  params: object;
}
