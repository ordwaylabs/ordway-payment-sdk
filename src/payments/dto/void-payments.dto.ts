import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsObject, IsNumber } from 'class-validator';
import { PaymentGatewayConfigDto } from '../../payment-gateway-config/payment-gatway-config.dto';
import { PaymentGatewayConfig } from '../../utils/payment-gateway-config.interface';
import { PaymentParam } from '../payments.interface';

export class VoidPaymentsDto implements PaymentParam {
  @ApiProperty({
    title: 'Gateway Details',
    type: PaymentGatewayConfigDto,
  })
  @Type(() => PaymentGatewayConfigDto)
  gateway_config: PaymentGatewayConfig;

  @ApiProperty({
    title: 'Transaction reference for the payment',
    type: 'string',
  })
  transaction_ref: string;

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
    title: 'Reason for void',
    type: 'string',
  })
  @IsOptional()
  @IsString()
  reason: string;

  @ApiProperty({
    title: 'Unique id for payment',
    type: 'string',
  })
  @IsString()
  payment_uid: string;

  @ApiProperty({
    title: 'Optional parameter',
    type: 'object',
  })
  @IsOptional()
  @IsObject()
  options: object;
}
