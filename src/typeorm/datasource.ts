import { Boat } from '../boats/boats.entity';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'password',
  database: 'stress_testing',
  entities: [Boat],
  migrations: [],
});
