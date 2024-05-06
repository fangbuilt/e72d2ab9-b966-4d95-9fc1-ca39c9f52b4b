import { Controller, Post } from '@nestjs/common';
import { PositionSeedService } from './position.seed.service';

@Controller('positionSeed')
export class PositionSeedController {
  constructor(private readonly positionSeedService: PositionSeedService) {}

  @Post()
  async seedData() {
    await this.positionSeedService.seedPositions();
    return { message: 'Seeding process completed.' };
  }
}
