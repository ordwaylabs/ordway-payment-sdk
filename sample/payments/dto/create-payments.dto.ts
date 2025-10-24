import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { Customer } from '../../customer/customer.interface';
import { CreateCustomerDto } from '../../customer/dto/create-customer.dto';
import { PaymentMethod } from '../../payment-methods/payment-methods.interface';
import { OrdwayPaymentGatewayConfig } from '../../utils/payment-gateway-config.interface';
import { PaymentParam } from '../payments.interface';
import { OrdwayPaymentGatewayConfigDto } from '../../payment-gateway-config/payment-gatway-config.dto';
export class CreatePaymentsDto implements PaymentParam {
  @ApiProperty({
    title: 'Gateway Details',
    type: OrdwayPaymentGatewayConfigDto,
  })
  @Type(() => OrdwayPaymentGatewayConfigDto)
  gateway_config: OrdwayPaymentGatewayConfig;

  @ApiProperty({
    title: 'Customer Details',
    type: CreateCustomerDto,
  })
  @Type(() => CreateCustomerDto)
  customer_config: Customer;

  @ApiProperty({
    title: 'Unique id for payment',
    type: 'string',
  })
  @IsOptional()
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
  @IsOptional()
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
    type: 'number',
  })
  @IsOptional()
  @IsNumber()
  statement_descriptor: number;

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
}
