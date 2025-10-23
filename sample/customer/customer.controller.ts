import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CustomerService } from './customer.service';
import { GetCustomerPaymentMethodDto } from '../payment-methods/dto/get-customer-payment-method.dto';
import { convertToBool } from '../utils/convert-utilities';

@ApiBearerAuth()
@ApiTags('Customer')
@UseGuards(JwtAuthGuard)
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiExcludeEndpoint()
  @Post('get_customer')
  getCustomer(
    @Body() getCustomerPaymentMethodDto: GetCustomerPaymentMethodDto,
    @Headers('x-test-mode') testMode: string,
  ) {
    return this.customerService.get(
      getCustomerPaymentMethodDto,
      convertToBool(testMode),
    );
  }

  @ApiExcludeEndpoint()
  @Post('create_customer')
  createCustomer(
    @Body() createCustomerDto,
    @Headers('x-test-mode') testMode: string,
  ) {
    return this.customerService.create(
      createCustomerDto,
      convertToBool(testMode),
    );
  }
}
