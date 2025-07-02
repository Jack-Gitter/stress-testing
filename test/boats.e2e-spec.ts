import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { BoatsModule } from 'src/boats/boats.module';

describe('Cats', () => {
  let app: INestApplication;
  const catsService = { findAll: () => ['test'] };

  beforeAll(async () => {
    // create a test container, then override the typeorm module with the connection information from the test container   postgresContainer = await new PostgreSqlContainer().start();

    const postgresContainer = await new PostgresSQ()
      .withDatabase('contract_testing')
      .withUsername('postgres')
      .withPassword('postgres')
      .start();
    const moduleRef = await Test.createTestingModule({
      imports: [BoatsModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET cats`, () => {
    return request(app.getHttpServer()).get('/cats').expect(200).expect({
      data: catsService.findAll(),
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
