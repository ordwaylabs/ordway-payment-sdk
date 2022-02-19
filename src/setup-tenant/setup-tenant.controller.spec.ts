import { Test, TestingModule } from '@nestjs/testing';
import { SetupTenantController } from './setup-tenant.controller';

describe('SetupTenantController', () => {
  let controller: SetupTenantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SetupTenantController],
    }).compile();

    controller = module.get<SetupTenantController>(SetupTenantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
