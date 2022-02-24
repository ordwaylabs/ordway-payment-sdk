import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOjEyMzQ1LCJ1c2VyX2lkIjoxMn0.7XdB9903jKn4xQKLFsiCgLVWgtTeR2nMf0CoOZ4PVlY';

import setupFields from '../setup-files/setup-fields.json';
import manageFields from '../setup-files/manage-fields.json';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('OK!');
  });

  it('/setup-tenant/get_setup_fields (GET)', () => {
    return request(app.getHttpServer())
      .get('/setup-tenant/get_setup_fields')
      .auth(token, { type: 'bearer' })
      .expect(200)
      .expect({ fields: setupFields });
  });

  it('/setup-tenant/get_manage_fields (GET)', () => {
    return request(app.getHttpServer())
      .get('/setup-tenant/get_manage_fields')
      .auth(token, { type: 'bearer' })
      .expect(200)
      .expect({ fields: setupFields });
  });
});
