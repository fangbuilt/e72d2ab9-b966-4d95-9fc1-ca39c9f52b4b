import { Controller, Post } from '@nestjs/common';
import { EmployeeSeedService } from './employee.seed.service';

@Controller('employeeSeed')
export class EmployeeSeedController {
  constructor(private readonly employeeSeedService: EmployeeSeedService) {}

  @Post()
  async seedData() {
    await this.employeeSeedService.seedEmployees();
    return { message: 'Seeding process completed.' };
  }
}
