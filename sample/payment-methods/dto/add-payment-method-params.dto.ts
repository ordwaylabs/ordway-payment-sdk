import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreditCardDetailsDto {
  @ApiProperty()
  @IsString()
  number: string;
  @ApiProperty()
  @IsNumber()
  month: number;
  @ApiProperty()
  @IsNumber()
  year: number;
  @ApiProperty()
  @IsString()
  cvd: string;
}

export class AddressDto {
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
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  default?: boolean;
}
export class CustomerDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsPhoneNumber()
  phone: string;
  @ApiProperty()
  @IsOptional()
  @IsObject()
  address?: AddressDto;
}

export class ACHDto {
  @ApiProperty()
  @IsString()
  customer_id: string;
  @ApiProperty()
  @IsString()
  routing_number: string;
  @ApiProperty()
  @IsString()
  account_number: string;
  @ApiProperty()
  @IsString()
  bank_account_type: string;
  @ApiProperty()
  @IsString()
  plaid_token: string;
}

export class AddPaymentMethodParamsDto {
  @ApiProperty()
  @IsString()
  type: 'card' | 'ach' | 'Credit Card' | 'Bank Account';
  @ApiProperty()
  @IsOptional()
  @Type(() => CreditCardDetailsDto)
  card?: CreditCardDetailsDto;
  @ApiProperty()
  @Type(() => CustomerDto)
  customer: CustomerDto;
  @ApiProperty()
  @IsOptional()
  @Type(() => ACHDto)
  ach?: ACHDto;
  @ApiProperty()
  @IsString()
  uuid?: string;
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  default?: boolean;
}
