import { Injectable } from '@nestjs/common';
import { UUID } from 'node:crypto';
import { Repository } from 'typeorm';
import { Boat } from './boats.entity';
import { BOAT_CONDITION } from './boats.enums';

@Injectable()
export class BoatsService {
  constructor(private boatsRepository: Repository<Boat>) {}

  public async rentBoat(id: UUID): Promise<void> {
    const boat = await this.boatsRepository.findOneByOrFail({ id });
    boat.rentBoat();
  }

  public async findAvailableBoats(): Promise<Boat[]> {
    const boats = await this.boatsRepository.find({
      where: {
        currentlyRented: false,
      },
    });
    return boats;
  }

  public async returnBoat(id: UUID): Promise<void> {
    const boat = await this.boatsRepository.findOneByOrFail({ id });
    boat.returnBoat();
  }

  public async createBoat(
    price: number,
    topSpeedInKnots: number,
    capacity: number,
    name: string,
  ): Promise<Boat> {
    const boat = new Boat(
      price,
      topSpeedInKnots,
      capacity,
      name,
      BOAT_CONDITION.NEW,
      false,
    );
    await this.boatsRepository.save(boat);
    return boat;
  }
}
