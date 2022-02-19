import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetCustomerDto {
  @ApiProperty({
    type: 'string',
    description: 'unique identifier for the customer',
  })
  @IsString()
  customer_uid: string;
}
