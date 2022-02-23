import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SetupTenantService } from './setup-tenant.service';

@ApiTags('Setup Tenant')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('setup-tenant')
export class SetupTenantController {
  constructor(private readonly setupTenantService: SetupTenantService) {}

  @Get('get_setup_fields')
  getSetupFields() {
    this.setupTenantService.getSetupFields();
  }

  @Get('get_manage_fields')
  getManageFields() {
    this.setupTenantService.getSetupFields();
  }

  @Post('register_payment_gateway')
  registerPaymentGateway(@Body() params) {
    this.setupTenantService.registerPaymentGatewayAccountDetails(params);
  }

  @Post('update_payment_gateway')
  updatePaymentGateway(@Body() params) {
    this.setupTenantService.updatePaymentGatewayAccountDetails(params);
  }
}
