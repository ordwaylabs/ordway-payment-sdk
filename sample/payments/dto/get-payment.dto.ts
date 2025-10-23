import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { OrdwayPaymentGatewayConfigDto } from '../../payment-gateway-config/payment-gatway-config.dto';
import { OrdwayPaymentGatewayConfig } from '../../utils/payment-gateway-config.interface';
import { PaymentParam } from '../payments.interface';

export class GetPaymentDto implements PaymentParam {
  @ApiProperty({
    title: 'Gateway Details',
    type: OrdwayPaymentGatewayConfigDto,
  })
  @Type(() => OrdwayPaymentGatewayConfigDto)
  gateway_config: OrdwayPaymentGatewayConfig;

  @ApiProperty({
    title: 'Payment unique id',
    type: 'string',
  })
  @IsString()
  transaction_ref?: string;
}
