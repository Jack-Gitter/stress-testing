import { Module } from '@nestjs/common';
import { BoatsController } from './boats.controller';
import { BoatsService } from './boats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boat } from './boats.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Boat])],
  controllers: [BoatsController],
  providers: [BoatsService],
})
export class BoatsModule {}
