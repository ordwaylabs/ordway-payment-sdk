import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class VerifyMicroDepositsParamsDto {
  @ApiProperty()
  @IsString()
  token: string;
  @ApiProperty()
  @IsNumber()
  amount1: number;
  @ApiProperty()
  @IsNumber()
  amount2: number;
}
