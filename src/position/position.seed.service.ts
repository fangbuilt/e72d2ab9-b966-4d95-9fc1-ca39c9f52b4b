import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Position } from './entities/position.entity';
import { Model } from 'mongoose';
import { faker } from '@faker-js/faker';

@Injectable()
export class PositionSeedService {
  private readonly logger = new Logger(PositionSeedService.name);

  constructor(
    @InjectModel(Position.name)
    private readonly positionModel: Model<Position>,
  ) {}

  async seedPositions() {
    try {
      const positionsData = Array.from({ length: 24 }, () => ({
        title: faker.person.jobTitle(),
      }));

      await this.positionModel.insertMany(positionsData);
      this.logger.log('Positions seeded!');
    } catch (error) {
      this.logger.error(`Error seeding positions: ${error.message}`);
      throw error;
    }
  }
}
