import { Test, TestingModule } from '@nestjs/testing';
import { SetupTenantService } from './setup-tenant.service';

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
});
