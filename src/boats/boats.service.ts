import { Injectable } from '@nestjs/common';
import { UUID } from 'node:crypto';
import { DataSource, Repository } from 'typeorm';
import { Boat } from './boats.entity';
import { BOAT_CONDITION } from './boats.enums';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoatsService {
  constructor(
    @InjectRepository(Boat) private boatsRepository: Repository<Boat>,
    private dataSource: DataSource,
  ) {}

  public async rentAllBoats() {
    await this.dataSource.transaction(async (manager) => {
      const boatRepo = manager.getRepository(Boat);
      const allBoats = await boatRepo.find({
        where: {
          currentlyRented: false,
        },
      });
      const rentedBoats = allBoats.map((boat) => {
        boat.rentBoat();
        return boat;
      });
      await boatRepo.save(rentedBoats);
    });
  }

  public async rentBoat(id: UUID): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const boatRepo = manager.getRepository(Boat);
      const boat = await boatRepo.findOneByOrFail({ id });
      boat.rentBoat();
      await boatRepo.save(boat);
    });
  }

  public async findAvailableBoats(): Promise<Boat[]> {
    const boats = await this.boatsRepository.find({
      where: {
        currentlyRented: false,
      },
    });
    return boats;
  }

  public async findBoats(): Promise<Boat[]> {
    return await this.boatsRepository.find();
  }

  public async returnBoat(id: UUID): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const boatRepo = manager.getRepository(Boat);
      const boat = await boatRepo.findOneByOrFail({ id });
      boat.returnBoat();
      boatRepo.save(boat);
    });
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
