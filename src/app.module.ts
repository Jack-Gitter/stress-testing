import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boat } from './boats/boats.entity';
import { BoatInit1751392916138 } from './typeorm/migrations/1751392916138-boat-init';
import { BoatsModule } from './boats/boats.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'password',
      database: 'stress_testing',
      migrationsRun: true,
      entities: [Boat],
      migrations: [BoatInit1751392916138],
    }),
    BoatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
