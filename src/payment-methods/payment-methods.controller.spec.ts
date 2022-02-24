import { Test, TestingModule } from '@nestjs/testing';
import { NonSupportedByPaymentGateway } from '../errors/non-supported-by-payment-gateway';
import { AddPaymentMethodDto } from './dto/add-payment-method.dto';
import { DeletePaymentMethodDto } from './dto/delete-payment-method.dto';
import { GetAddPaymentMethodFormDto } from './dto/get-add-payment-method-form.dto';
import { GetCustomerPaymentMethodDto } from './dto/get-customer-payment-method.dto';
import { GetPaymentMethodDto } from './dto/get-payment-method.dto';
import { PaymentMethodsController } from './payment-methods.controller';
import { PaymentMethodsService } from './payment-methods.service';

describe('PaymentMethodsController', () => {
  let controller: PaymentMethodsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentMethodsController],
      providers: [PaymentMethodsService],
    }).compile();

    controller = module.get<PaymentMethodsController>(PaymentMethodsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add payment method', () => {
    //TODO: update the argument to have the corrected parameters in implementation
    const addPaymentMethodDto: AddPaymentMethodDto = new AddPaymentMethodDto();
    expect(
      controller.addPaymentMethod(addPaymentMethodDto),
    ).rejects.toThrowError(NonSupportedByPaymentGateway);
  });

  it('should delete payment method', () => {
    //TODO: update the argument to have the corrected parameters in implementation
    const deletePaymentMethodDto: DeletePaymentMethodDto =
      new DeletePaymentMethodDto();
    expect(
      controller.deletePaymentMethod(deletePaymentMethodDto),
    ).rejects.toThrowError(NonSupportedByPaymentGateway);
  });

  it('should get add ach payment method form', () => {
    //TODO: update the argument to have the corrected parameters in implementation
    const getAddPaymentMethodFormDto: GetAddPaymentMethodFormDto =
      new GetAddPaymentMethodFormDto();
    expect(() =>
      controller.getAddACHMethodForm(getAddPaymentMethodFormDto),
    ).toThrowError(NonSupportedByPaymentGateway);
  });

  it('should get add credit card payment method form', () => {
    //TODO: update the argument to have the corrected parameters in implementation
    const getAddPaymentMethodFormDto: GetAddPaymentMethodFormDto =
      new GetAddPaymentMethodFormDto();
    expect(() =>
      controller.getAddCCMethodForm(getAddPaymentMethodFormDto),
    ).toThrowError(NonSupportedByPaymentGateway);
  });

  it('should return payment methods for customers', () => {
    //TODO: update the argument to have the corrected parameters in implementation
    const getCustomerPaymentMethodDto: GetCustomerPaymentMethodDto =
      new GetCustomerPaymentMethodDto();
    expect(
      controller.getCustomerPaymentMethod(getCustomerPaymentMethodDto),
    ).rejects.toThrowError(NonSupportedByPaymentGateway);
  });

  it('should return payment method details for a method', () => {
    //TODO: update the argument to have the corrected parameters in implementation
    const getPaymentMethodDto: GetPaymentMethodDto = new GetPaymentMethodDto();
    expect(
      controller.getPaymentMethodDetails(getPaymentMethodDto),
    ).rejects.toThrowError(NonSupportedByPaymentGateway);
  });

  it('should return payment method details for a method', () => {
    //TODO: update the argument to have the corrected parameters in implementation
    const updatePaymentMethodDto: AddPaymentMethodDto =
      new AddPaymentMethodDto();
    expect(
      controller.updatePaymentMethod(updatePaymentMethodDto),
    ).rejects.toThrowError(NonSupportedByPaymentGateway);
  });
});
