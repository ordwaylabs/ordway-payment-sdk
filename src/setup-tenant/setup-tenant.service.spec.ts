import { Test, TestingModule } from '@nestjs/testing';
import { SetupTenantService } from './setup-tenant.service';
import setupFields from '../../setup-files/setup-fields.json';
import manageFields from '../../setup-files/manage-fields.json';
import { NonSupportedByPaymentGateway } from '../errors/non-supported-by-payment-gateway';

describe('SetupTenantService', () => {
  let service: SetupTenantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SetupTenantService],
    }).compile();

    service = module.get<SetupTenantService>(SetupTenantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return setup fields', () => {
    const fields = service.getSetupFields().fields;

    expect(fields).toEqual(setupFields);
  });

  it('should return manage fields', () => {
    const fields = service.getManageFields().fields;

    expect(fields).toEqual(manageFields);
  });

  it('should return register payment gateway', () => {
    //TODO: update the argument to have the corrected parameters in implementation
    expect(
      service.registerPaymentGatewayAccountDetails({}),
    ).rejects.toThrowError(NonSupportedByPaymentGateway);
  });

  it('should return update payment gateway', () => {
    //TODO: update the argument to have the corrected parameters in implementation
    expect(service.updatePaymentGatewayAccountDetails({})).rejects.toThrowError(
      NonSupportedByPaymentGateway,
    );
  });
});
