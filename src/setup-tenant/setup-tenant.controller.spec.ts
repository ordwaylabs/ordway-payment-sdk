import { Test, TestingModule } from '@nestjs/testing';
import { SetupTenantController } from './setup-tenant.controller';
import { SetupTenantService } from './setup-tenant.service';

import setupFields from '../../setup-files/setup-fields.json';
import manageFields from '../../setup-files/manage-fields.json';
import { NonSupportedByPaymentGateway } from '../errors/non-supported-by-payment-gateway';

describe('SetupTenantController', () => {
  let controller: SetupTenantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SetupTenantController],
      providers: [SetupTenantService],
    }).compile();

    controller = module.get<SetupTenantController>(SetupTenantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return setup fields', () => {
    const fields = controller.getSetupFields().fields;

    expect(fields).toEqual(setupFields);
  });

  it('should return manage fields', () => {
    const fields = controller.getManageFields().fields;

    expect(fields).toEqual(manageFields);
  });

  it('should return register payment gateway', () => {
    //TODO: update the argument to have the corrected parameters in implementation
    expect(controller.registerPaymentGateway({})).rejects.toThrowError(
      NonSupportedByPaymentGateway,
    );
  });

  it('should return update payment gateway', () => {
    //TODO: update the argument to have the corrected parameters in implementation
    expect(controller.updatePaymentGateway({})).rejects.toThrowError(
      NonSupportedByPaymentGateway,
    );
  });
});
