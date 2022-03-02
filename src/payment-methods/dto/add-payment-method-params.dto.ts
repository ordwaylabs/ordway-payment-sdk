import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreditCardDetailsDto {
  @ApiProperty()
  @IsString()
  cardholder: string;
  @ApiProperty()
  @IsNumber()
  number: number;
  @ApiProperty()
  @IsNumber()
  expiry_month: number;
  @ApiProperty()
  @IsNumber()
  expiry_year: number;
  @ApiProperty()
  @IsNumber()
  cvd: number;
  @ApiProperty()
  @IsNumber()
  cvd_indicator: number;
}

export class AddPaymentMethodParamsDto {
  @ApiProperty()
  @Type(() => CreditCardDetailsDto)
  credit_card: CreditCardDetailsDto;
  @ApiProperty()
  @IsString()
  method_uid?: string;
}
