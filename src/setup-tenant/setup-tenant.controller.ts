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
    return this.setupTenantService.getSetupFields();
  }

  @Get('get_manage_fields')
  getManageFields() {
    return this.setupTenantService.getSetupFields();
  }

  @Post('register_payment_gateway')
  async registerPaymentGateway(@Body() params) {
    return await this.setupTenantService.registerPaymentGatewayAccountDetails(
      params,
    );
  }

  @Post('update_payment_gateway')
  async updatePaymentGateway(@Body() params) {
    return await this.setupTenantService.updatePaymentGatewayAccountDetails(
      params,
    );
  }
}
