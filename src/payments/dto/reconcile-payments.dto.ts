import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { PaymentGatewayConfigDto } from '../../payment-gateway-config/payment-gatway-config.dto';
import { PaymentGatewayConfig } from '../../utils/payment-gateway-config.interface';
import { PaymentParam } from '../payments.interface';

export class ReconcilePaymentsDto implements PaymentParam {
  @ApiProperty({
    title: 'Gateway Details',
    type: PaymentGatewayConfigDto,
  })
  @Type(() => PaymentGatewayConfigDto)
  gateway_config: PaymentGatewayConfig;

  @ApiProperty({
    title: 'List payment ids',
    type: 'string',
  })
  @IsString({ each: true })
  payments: string[];

  @ApiProperty({
    title: 'How many results to return. Between 1 and 100, defaults to 20',
    type: 'number',
  })
  @IsNumber()
  limit: number;

  @ApiProperty({
    title: 'How many results to skip',
    type: 'number',
  })
  @IsNumber()
  offset: number;

  @ApiProperty({
    title: 'Datetime to start the search from, in ISO8601 format',
    type: 'Date',
  })
  @IsNumber()
  from: Date;

  @ApiProperty({
    title: 'Datetime to start the search to, in ISO8601 format',
    type: 'Date',
  })
  @IsNumber()
  to: Date;

  @ApiProperty({
    title: 'Customer ID to be filtered',
    type: 'string',
  })
  @IsNumber()
  customer_uid: string;
}
