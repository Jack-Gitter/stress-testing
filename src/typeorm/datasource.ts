import { Boat } from 'src/boats/boats.entity';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'stress_testing',
  entities: [Boat],
  migrations: [],
});
