import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Customer } from '../../customer/customer.interface';
import { CreateCustomerDto } from '../../customer/dto/create-customer.dto';
import { PaymentGatewayConfigDto } from '../../payment-gateway-config/payment-gatway-config.dto';
import { PaymentGatewayConfig } from '../../utils/payment-gateway-config.interface';

export class GetCustomerPaymentMethodDto {
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
}
