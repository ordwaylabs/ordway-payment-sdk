import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import { GetCustomerPaymentMethodDto } from './get-customer-payment-method.dto';

export class AttachPaymentMethodDto extends GetCustomerPaymentMethodDto {
  @ApiProperty({
    title: 'Unique ID of Payment Method',
    type: 'string',
  })
  @IsString()
  token: string;

  @ApiProperty({
    title: 'Unique ID of Payment Method',
    type: 'string',
  })
  @IsBoolean()
  default: boolean;
}
