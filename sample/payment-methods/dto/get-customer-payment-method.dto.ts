import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Customer } from '../../customer/customer.interface';
import { CreateCustomerDto } from '../../customer/dto/create-customer.dto';
import { OrdwayPaymentGatewayConfigDto } from '../../payment-gateway-config/payment-gatway-config.dto';

export class GetCustomerPaymentMethodDto {
  @ApiProperty({
    title: 'Gateway Details',
    type: OrdwayPaymentGatewayConfigDto,
  })
  @Type(() => OrdwayPaymentGatewayConfigDto)
  gateway_config: OrdwayPaymentGatewayConfigDto;

  @ApiProperty({
    title: 'Customer Details',
    type: CreateCustomerDto,
  })
  @Type(() => CreateCustomerDto)
  customer_config: Customer;
}
