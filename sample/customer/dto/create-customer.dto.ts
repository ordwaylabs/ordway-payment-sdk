import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { AddressDto } from '../../payment-methods/dto/add-payment-method-params.dto';
import { PaymentMethod } from '../../payment-methods/payment-methods.interface';
import { Customer } from '../customer.interface';
import { OrdwayPaymentGatewayConfigDto } from '../../payment-gateway-config/payment-gatway-config.dto';
import { OrdwayPaymentGatewayConfig } from '../../utils/payment-gateway-config.interface';

export class CustomerAddressDto extends AddressDto {
  @ApiProperty()
  @IsString()
  label: string;
  @ApiProperty()
  @IsString()
  line1: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  line2?: string;
  @ApiProperty()
  @IsString()
  city: string;
  @ApiProperty()
  @IsString()
  state: string;
  @ApiProperty()
  @IsString()
  country: string;
  @ApiProperty()
  @IsString()
  postal: string;
}
export class CreateCustomerDto implements Customer {
  @ApiProperty({
    title: 'Gateway Details',
    type: OrdwayPaymentGatewayConfigDto,
  })
  @Type(() => OrdwayPaymentGatewayConfigDto)
  gateway_config: OrdwayPaymentGatewayConfig;

  @ApiProperty({
    type: 'string',
    description: 'unique identifier for the customer',
  })
  @IsString()
  uuid: string;

  @ApiProperty({
    type: 'string',
    description: 'unique identifier for the gateway',
  })
  @IsString()
  gateway_id: string;

  @ApiProperty({
    type: 'PaymentMethod',
    description: 'unique identifier for the gateway',
  })
  @Optional()
  methods: PaymentMethod;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => CustomerAddressDto)
  addresses?: CustomerAddressDto[];
}
