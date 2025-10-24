import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { GetCustomerPaymentMethodDto } from './get-customer-payment-method.dto';
import { PaymentMethod } from '../payment-methods.interface';

export class DeletePaymentMethodDto extends GetCustomerPaymentMethodDto {
  @ApiProperty({
    title: 'Unique ID Payment Method',
    type: 'string',
  })
  @IsOptional()
  @IsString()
  uuid: string;

  @ApiProperty({
    title: 'List of Unique IDs of Payment Methods',
  })
  @IsOptional()
  @IsString({ each: true })
  methods: string[];
}
