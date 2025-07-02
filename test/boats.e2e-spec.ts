import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { BoatsModule } from '../src/boats/boats.module';
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boat } from '../src/boats/boats.entity';
import { BoatInit1751392916138 } from '../src/typeorm/migrations/1751392916138-boat-init';
import { BOAT_CONDITION } from '../src/boats/boats.enums';
import { DataSource } from 'typeorm';

describe('Cats', () => {
  let app: INestApplication;
  let allBoats: Boat[];

  beforeAll(async () => {
    const postgresInstance = await new PostgreSqlContainer(
      'postgres:13.3-alpine',
    )
      .withDatabase('stress_testing')
      .withUsername('postgres')
      .withPassword('postgres')
      .start();

    const boats = Array.from({ length: 50 }, () => {
      const price = Math.floor(Math.random() * 1_000_000);
      const speed = Math.floor(Math.random() * 100);
      const capacity = Math.floor(Math.random() * 30);
      const name = '';
      const condition =
        Object.values(BOAT_CONDITION)[Math.floor(Math.random() * 3)];
      return new Boat(price, speed, capacity, name, condition, false);
    });

    allBoats = boats;

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

    const dataSource = app.get(DataSource);
    const boatRepo = dataSource.getRepository(Boat);
    await boatRepo.save(boats);
  });

  it(`GET boats`, () => {
    return request(app.getHttpServer())
      .get('/boats')
      .expect(200)
      .expect(allBoats);
  });

  afterAll(async () => {
    await app.close();
  });
});
