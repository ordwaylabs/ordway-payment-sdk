import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { OrdwayPaymentGatewayConfigDto } from '../../payment-gateway-config/payment-gatway-config.dto';
import { OrdwayPaymentGatewayConfig } from '../../utils/payment-gateway-config.interface';
import { PaymentParam } from '../payments.interface';

export class ReconcilePaymentsDto implements PaymentParam {
  @ApiProperty({
    title: 'Gateway Details',
    type: OrdwayPaymentGatewayConfigDto,
  })
  @Type(() => OrdwayPaymentGatewayConfigDto)
  gateway_config: OrdwayPaymentGatewayConfig;

  @ApiProperty({
    title: 'List payment ids',
    type: 'string',
  })
  @IsString({ each: true })
  @IsOptional()
  payments: string[];

  @ApiProperty({
    title: 'Timeout Payments',
    type: 'string',
  })
  @IsOptional()
  timeout_payments: string[];

  @ApiProperty({
    title: 'How many results to return. Between 1 and 100, defaults to 20',
    type: 'number',
  })
  @IsNumber()
  @IsOptional()
  limit: number = 20;

  @ApiProperty({
    title: 'How many results to skip',
    type: 'number',
  })
  @IsOptional()
  @IsNumber()
  offset: number = 20;

  @ApiProperty({
    title: 'Datetime to start the search from, in ISO8601 format',
    type: 'string',
  })
  @IsString()
  @IsOptional()
  from: string;

  @ApiProperty({
    title: 'Datetime to start the search to, in ISO8601 format',
    type: 'string',
  })
  @IsString()
  @IsOptional()
  to: string;

  @ApiProperty({
    title: 'Timeout',
    type: 'boolean',
  })
  @IsBoolean()
  @IsOptional()
  timeout: boolean;
}
