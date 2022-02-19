import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle(`Payment Gateway ${process.env.NAME}`)
    .setDescription(process.env.DESCRIPTION)
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Customer', 'Create and get the customer payment gateway')
    .addTag(
      'Payment Methods',
      'Create, get and update the customer payment method',
    )
    .addTag('Payments', 'Create, get, refund, void and delete the payments')
    .addTag('Setup Tenant', 'Register and update payment gateway for tenant')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document, {
    customSiteTitle: `Payment Gateway ${process.env.NAME}`,
    customfavIcon: 'images/favicon.ico',
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  await app.listen(process.env.PORT);
}
bootstrap();
