import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CustomerService } from './customer.service';
import { GetCustomerDto } from './dto/get-customer.dto';

@ApiBearerAuth()
@ApiTags('Customer')
@UseGuards(JwtAuthGuard)
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get(':customer_uid')
  get(@Param() uid: GetCustomerDto) {
    this.customerService.get(uid.customer_uid);
  }

  @Post()
  create(@Body() createCustomerDto) {
    this.customerService.create(createCustomerDto);
  }
}
