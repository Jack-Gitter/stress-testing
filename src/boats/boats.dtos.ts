import { IsNumber, IsString } from 'class-validator';

export class CreateBoatDTO {
  @IsNumber()
  public price: number;
  @IsNumber()
  public topSpeedInKnots: number;
  @IsNumber()
  public capacity: number;
  @IsString()
  public name: string;
}
