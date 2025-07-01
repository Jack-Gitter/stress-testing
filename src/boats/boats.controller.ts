import { Controller } from '@nestjs/common';
import { BoatsService } from './boats.service';

@Controller()
export class BoatsController {
  constructor(private boatsService: BoatsService) {}
}
