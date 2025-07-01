import { Column, Entity } from 'typeorm';
import { BOAT_CONDITION } from './boats.enums';

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

  @Column({ name: 'name', type: 'enum', enum: BOAT_CONDITION })
  public condition: BOAT_CONDITION;

  constructor(
    price: number,
    topSpeedInKnots: number,
    capacity: number,
    name: string,
    condition: BOAT_CONDITION,
  ) {
    this.price = price;
    this.topSpeedInKnots = topSpeedInKnots;
    this.capacity = capacity;
    this.name = name;
    this.condition = condition;
  }

  updateCondition(newCondition: BOAT_CONDITION) {
    this.condition = newCondition;
  }
}
