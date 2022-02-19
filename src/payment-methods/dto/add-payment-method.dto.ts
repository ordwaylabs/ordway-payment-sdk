import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PaymentGatewayConfigDto } from '../../payment-gateway-config/payment-gatway-config.dto';
import { PaymentGatewayConfig } from '../../utils/payment-gateway-config.interface';
import { GetCustomerPaymentMethodDto } from './get-customer-payment-method.dto';

export class AddPaymentMethodDto extends GetCustomerPaymentMethodDto {
  @ApiProperty({
    title: 'Gateway Details',
    type: PaymentGatewayConfigDto,
  })
  @Type(() => PaymentGatewayConfigDto)
  gateway_config: PaymentGatewayConfig;
}
