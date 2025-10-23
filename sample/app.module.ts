import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SetupTenantController } from './setup-tenant/setup-tenant.controller';
import { SetupTenantService } from './setup-tenant/setup-tenant.service';
import { CustomerController } from './customer/customer.controller';
import { PaymentsService } from './payments/payments.service';
import { PaymentsController } from './payments/payments.controller';
import { CustomerService } from './customer/customer.service';
import { PaymentMethodsService } from './payment-methods/payment-methods.service';
import { PaymentMethodsController } from './payment-methods/payment-methods.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule],
  controllers: [
    AppController,
    SetupTenantController,
    CustomerController,
    PaymentMethodsController,
    PaymentsController,
  ],
  providers: [
    AppService,
    SetupTenantService,
    CustomerService,
    PaymentMethodsService,
    PaymentsService,
  ],
})
export class AppModule {}
