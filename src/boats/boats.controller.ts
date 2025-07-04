import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BoatsService } from './boats.service';
import { Boat } from './boats.entity';
import { UUID } from 'node:crypto';
import { CreateBoatDTO } from './boats.dtos';

@Controller('boats')
export class BoatsController {
  constructor(private boatsService: BoatsService) {}

  @Patch('rent/:id')
  public async rentBoat(@Param('id') id: UUID): Promise<void> {
    await this.boatsService.rentBoat(id);
  }

  @Get('available')
  public async findAvailableBoats(): Promise<Boat[]> {
    return await this.boatsService.findAvailableBoats();
  }

  @Get()
  public async findBoats(): Promise<Boat[]> {
    return await this.boatsService.findBoats();
  }

  @Patch('return/:id')
  public async returnBoat(@Param('id') id: UUID): Promise<void> {
    await this.boatsService.returnBoat(id);
  }

  @Patch('all/rent')
  public async rentAllBoats() {
    return await this.boatsService.rentAllBoats();
  }

  @Patch('all/return')
  public async returnAllBoats() {
    return await this.boatsService.returnAllBoats();
  }

  @Post()
  public async createBoat(@Body() body: CreateBoatDTO): Promise<Boat> {
    return await this.boatsService.createBoat(
      body.price,
      body.topSpeedInKnots,
      body.capacity,
      body.name,
    );
  }
}
