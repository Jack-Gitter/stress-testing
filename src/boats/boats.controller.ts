import { Controller } from '@nestjs/common';
import { BoatsService } from './boats.service';
import { Boat } from './boats.entity';
import { UUID } from 'node:crypto';

@Controller()
export class BoatsController {
  constructor(private boatsService: BoatsService) {}

  public async rentBoat(id: UUID): Promise<void> {
    await this.boatsService.rentBoat(id);
  }

  public async findAvailableBoats(): Promise<Boat[]> {
    return await this.boatsService.findAvailableBoats();
  }

  public async returnBoat(id: UUID): Promise<void> {
    await this.boatsService.returnBoat(id);
  }

  public async createBoat(
    price: number,
    topSpeedInKnots: number,
    capacity: number,
    name: string,
  ): Promise<Boat> {
    return await this.boatsService.createBoat(
      price,
      topSpeedInKnots,
      capacity,
      name,
    );
  }
}
