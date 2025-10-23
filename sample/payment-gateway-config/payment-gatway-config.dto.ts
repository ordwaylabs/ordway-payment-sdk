import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import {
  OrdwayPaymentGatewayConfig,
  PaymentGatewayConfig,
} from '../utils/payment-gateway-config.interface';

export class PaymentGatewayConfigDto implements PaymentGatewayConfig {
  @ApiProperty()
  @IsString()
  id: string;
  @ApiProperty()
  @IsString()
  type: string;
  @ApiProperty()
  @IsString()
  defaultMerchantId: string;
  @ApiProperty()
  @IsString()
  defaultTerminalId: string;
  @ApiProperty()
  @IsString()
  defaultTerminalGatewayId: string;
}

export class OrdwayPaymentGatewayConfigDto
  implements OrdwayPaymentGatewayConfig
{
  @ApiProperty({
    title: 'Gateway Tenant Id',
  })
  @IsString()
  tenant_id: string;

  @ApiProperty({
    title: 'Gateway Details',
    type: PaymentGatewayConfigDto,
  })
  @Type(() => PaymentGatewayConfigDto)
  tenant_config: PaymentGatewayConfigDto;
}
