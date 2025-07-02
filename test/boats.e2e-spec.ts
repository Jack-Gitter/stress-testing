import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { BoatsModule } from '../src/boats/boats.module';
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boat } from '../src/boats/boats.entity';
import { BoatInit1751392916138 } from '../src/typeorm/migrations/1751392916138-boat-init';

describe('Cats', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const postgresInstance = await new PostgreSqlContainer(
      'postgres:13.3-alpine',
    )
      .withDatabase('stress_testing')
      .withUsername('postgres')
      .withPassword('postgres')
      .start();

    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: postgresInstance.getHost(),
          port: postgresInstance.getPort(),
          username: postgresInstance.getUsername(),
          password: postgresInstance.getPassword(),
          database: postgresInstance.getDatabase(),
          migrationsRun: true,
          entities: [Boat],
          migrations: [BoatInit1751392916138],
        }),
        BoatsModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`GET boats`, () => {
    return request(app.getHttpServer()).get('/boats').expect(200).expect({});
  });

  afterAll(async () => {
    await app.close();
  });
});
