import { Boat } from '../boats/boats.entity';
import { DataSource } from 'typeorm';
import { BoatInit1751392916138 } from './migrations/1751392916138-boat-init';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'password',
  database: 'stress_testing',
  entities: [Boat],
  migrations: [BoatInit1751392916138],
});
