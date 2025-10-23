import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateSetupTenantDto } from './dto/create-setup-tenant.dto';
import { UpdateSetupTenantDto } from './dto/update-setup-tenant.dto';
import { SetupTenantService } from './setup-tenant.service';
import { convertToBool } from '../utils/convert-utilities';

@ApiTags('Setup Tenant')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('setup_tenant')
export class SetupTenantController {
  constructor(private readonly setupTenantService: SetupTenantService) {}

  @Post('get_setup_fields')
  getSetupFields() {
    return { tenant_form: this.setupTenantService.getSetupFields() };
  }

  @Post('get_manage_fields')
  getManageFields() {
    return this.setupTenantService.getManageFields();
  }

  @Post('register_payment_gateway')
  async registerPaymentGateway(
    @Body() createSetupTenantDto: CreateSetupTenantDto,
    @Headers('x-test-mode') testMode: string,
  ) {
    return await this.setupTenantService.registerPaymentGatewayAccountDetails(
      createSetupTenantDto,
      convertToBool(testMode),
    );
  }

  @Post('update_payment_gateway')
  async updatePaymentGateway(
    @Body() updateSetupTenantDto: UpdateSetupTenantDto,
    @Headers('x-test-mode') testMode: string,
  ) {
    return await this.setupTenantService.updatePaymentGatewayAccountDetails(
      updateSetupTenantDto,
      convertToBool(testMode),
    );
  }
}
