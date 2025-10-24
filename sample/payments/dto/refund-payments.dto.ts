import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { OrdwayPaymentGatewayConfigDto } from '../../payment-gateway-config/payment-gatway-config.dto';
import { OrdwayPaymentGatewayConfig } from '../../utils/payment-gateway-config.interface';
import { PaymentParam } from '../payments.interface';

export class RefundPaymentsDto implements PaymentParam {
  @ApiProperty({
    title: 'Gateway Details',
    type: OrdwayPaymentGatewayConfigDto,
  })
  @Type(() => OrdwayPaymentGatewayConfigDto)
  gateway_config: OrdwayPaymentGatewayConfig;

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
  @IsOptional()
  @IsString()
  currency: string;

  @ApiProperty({
    title: 'Reason for refund',
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
  @IsOptional()
  payment_uid: string;

  @ApiProperty({
    title: 'Optional parameter',
    type: 'object',
  })
  @IsOptional()
  options: object;
}
