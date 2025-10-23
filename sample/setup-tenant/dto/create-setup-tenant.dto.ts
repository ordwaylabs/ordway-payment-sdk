import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSetupTenantDto {
  @ApiProperty({
    title: 'Account ID',
    type: 'string',
  })
  @IsString()
  account_id: string;
}
