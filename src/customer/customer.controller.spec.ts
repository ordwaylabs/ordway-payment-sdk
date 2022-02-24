import { Test, TestingModule } from '@nestjs/testing';
import { NonSupportedByPaymentGateway } from '../errors/non-supported-by-payment-gateway';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { GetCustomerDto } from './dto/get-customer.dto';

describe('CustomerController', () => {
  let controller: CustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [CustomerService],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get customer', () => {
    //TODO: update the argument to have the corrected parameters in implementation
    const getCustomerDto: GetCustomerDto = new GetCustomerDto();
    expect(controller.get(getCustomerDto)).rejects.toThrowError(
      NonSupportedByPaymentGateway,
    );
  });

  it('should create customer', () => {
    //TODO: update the argument to have the corrected parameters in implementation
    const createCustomerDto: CreateCustomerDto = new CreateCustomerDto();
    expect(controller.create(createCustomerDto)).rejects.toThrowError(
      NonSupportedByPaymentGateway,
    );
  });
});
