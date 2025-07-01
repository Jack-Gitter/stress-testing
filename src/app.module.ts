import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boat } from './boats/boats.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'password',
      database: 'stress_testing',
      entities: [Boat],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
