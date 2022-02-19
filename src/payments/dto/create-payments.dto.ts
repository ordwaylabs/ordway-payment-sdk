import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { Customer } from 'src/customer/customer.interface';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';
import { PaymentMethod } from 'src/payment-methods/payment-methods.interface';
import { PaymentGatewayConfig } from 'src/utils/payment-gateway-config.interface';
import { PaymentParam } from '../payments.interface';
import { PaymentGatewayConfigDto } from 'src/payment-gateway-config/payment-gatway-config.dto';

export class CreatePaymentsDto implements PaymentParam {
  @ApiProperty({
    title: 'Gateway Details',
    type: PaymentGatewayConfigDto,
  })
  @Type(() => PaymentGatewayConfigDto)
  gateway_config: PaymentGatewayConfig;

  @ApiProperty({
    title: 'Customer Details',
    type: CreateCustomerDto,
  })
  @Type(() => CreateCustomerDto)
  customer_config: Customer;

  @ApiProperty({
    title: 'Unique id for payment method',
    type: 'string',
  })
  @IsOptional()
  @IsString()
  method_uid: string;

  @ApiProperty({
    title: 'Unique id for payment',
    type: 'string',
  })
  @IsString()
  payment_uid: string;

  @ApiProperty({
    title: 'Amount',
    type: 'number',
  })
  @IsOptional()
  @IsNumber()
  amount: number;

  @ApiProperty({
    title: 'Currency',
    type: 'string',
  })
  @IsString()
  currency: string;

  @ApiProperty({
    title: 'Description',
    type: 'string',
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    title: 'Statement Descriptor',
    type: 'string',
  })
  @IsOptional()
  @IsString()
  statement_descriptor: string;

  @ApiProperty({
    title: 'Optional parameter',
    type: 'object',
  })
  @IsOptional()
  @IsObject()
  options: object;

  @ApiProperty({
    title: 'Payment Method',
    type: 'object',
  })
  @IsOptional()
  @IsObject()
  method: PaymentMethod;

  @ApiProperty({
    title: 'Address',
    type: 'object',
  })
  @IsOptional()
  @IsObject()
  address: object;
}
