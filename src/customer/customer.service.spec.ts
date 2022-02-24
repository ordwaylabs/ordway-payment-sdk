import { Test, TestingModule } from '@nestjs/testing';
import { NonSupportedByPaymentGateway } from '../errors/non-supported-by-payment-gateway';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { GetCustomerDto } from './dto/get-customer.dto';

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerService],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get customer', () => {
    //TODO: update the argument to have the corrected parameters in implementation
    const getCustomerDto: GetCustomerDto = new GetCustomerDto();
    expect(service.get(getCustomerDto.customer_uid)).rejects.toThrowError(
      NonSupportedByPaymentGateway,
    );
  });

  it('should create customer', () => {
    //TODO: update the argument to have the corrected parameters in implementation
    const createCustomerDto: CreateCustomerDto = new CreateCustomerDto();
    expect(service.create(createCustomerDto)).rejects.toThrowError(
      NonSupportedByPaymentGateway,
    );
  });
});
