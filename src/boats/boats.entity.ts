import { Column, Entity } from 'typeorm';
import { BOAT_CONDITION } from './boats.enums';
import { ConflictException } from '@nestjs/common';

@Entity('boat')
export class Boat {
  @Column({ name: 'price', type: 'int' })
  public price: number;

  @Column({ name: 'top_speed_in_knots', type: 'int' })
  public topSpeedInKnots: number;

  @Column({ name: 'capacity', type: 'int' })
  public capacity: number;

  @Column({ name: 'name', type: 'varchar' })
  public name: string;

  @Column({ name: 'condition', type: 'enum', enum: BOAT_CONDITION })
  public condition: BOAT_CONDITION;

  @Column({ name: 'currentlyRented', type: 'boolean' })
  public currentlyRented: boolean;

  constructor(
    price: number,
    topSpeedInKnots: number,
    capacity: number,
    name: string,
    condition: BOAT_CONDITION,
    currentlyRented: boolean,
  ) {
    this.price = price;
    this.topSpeedInKnots = topSpeedInKnots;
    this.capacity = capacity;
    this.name = name;
    this.condition = condition;
    this.currentlyRented = currentlyRented;
  }

  public updateCondition(newCondition: BOAT_CONDITION) {
    this.condition = newCondition;
  }

  public rentBoat() {
    if (this.currentlyRented) {
      throw new ConflictException('Boat is currently rented already!');
    }
    this.currentlyRented = true;
  }

  public returnBoat() {
    this.currentlyRented = false;
  }
}
