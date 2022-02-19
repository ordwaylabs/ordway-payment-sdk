import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { PaymentGatewayConfigDto } from '../../payment-gateway-config/payment-gatway-config.dto';
import { PaymentGatewayConfig } from '../../utils/payment-gateway-config.interface';
import { PaymentParam } from '../payments.interface';

export class GetPaymentDto implements PaymentParam {
  @ApiProperty({
    title: 'Gateway Details',
    type: PaymentGatewayConfigDto,
  })
  @Type(() => PaymentGatewayConfigDto)
  gateway_config: PaymentGatewayConfig;

  @ApiProperty({
    title: 'Payment unique id',
    type: 'string',
  })
  @IsString()
  payment_uid?: string;
}
