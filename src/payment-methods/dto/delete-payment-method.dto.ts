import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { GetCustomerPaymentMethodDto } from './get-customer-payment-method.dto';

export class DeletePaymentMethodDto extends GetCustomerPaymentMethodDto {
  @ApiProperty({
    title: 'Unique ID Payment Method',
    type: 'string',
  })
  method_uid: string;

  @ApiProperty({
    title: 'List of Unique IDs of Payment Methods',
  })
  @IsString({ each: true })
  method_uids: string[];
}
