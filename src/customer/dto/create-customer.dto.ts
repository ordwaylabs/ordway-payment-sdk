import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';
import { PaymentMethod } from '../../payment-methods/payment-methods.interface';

export class CreateCustomerDto {
  @ApiProperty({
    type: 'string',
    description: 'unique identifier for the customer',
  })
  @IsString()
  customer_uid: string;

  @ApiProperty({
    type: 'string',
    description: 'unique identifier for the gateway',
  })
  @IsString()
  gateway_id: string;

  @ApiProperty({
    type: 'PaymentMethod',
    description: 'unique identifier for the gateway',
  })
  @IsObject({})
  @Optional()
  methods: PaymentMethod;
}
