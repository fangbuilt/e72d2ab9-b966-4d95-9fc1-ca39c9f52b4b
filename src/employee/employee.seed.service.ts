import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './entities/employee.entity';
import { Model } from 'mongoose';
import { faker } from '@faker-js/faker';
import { Position } from 'src/position/entities/position.entity';

@Injectable()
export class EmployeeSeedService {
  private readonly logger = new Logger(EmployeeSeedService.name);

  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<Employee>,
    @InjectModel(Position.name)
    private readonly positionModel: Model<Position>,
  ) {}

  async seedEmployees() {
    const positions = await this.positionModel.find();

    try {
      const employeesData = Array.from({ length: 120 }, () => {
        const positionIndex = faker.number.int({
          min: 0,
          max: positions.length - 1,
        });

        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const position = positions[positionIndex]._id;

        let phone = '+';
        for (let i = 0; i < 12; i++) {
          phone += faker.number.int({ min: 0, max: 9 }).toString();
        }

        const email = faker.internet
          .email({
            firstName: firstName,
            lastName: lastName,
            provider: 'mail.com',
          })
          .toLowerCase();

        return {
          firstName,
          lastName,
          position,
          phone,
          email,
        };
      });

      await this.employeeModel.insertMany(employeesData);
      this.logger.log('Employees seeded!');
    } catch (error) {
      this.logger.error(`Error seeding employees: ${error.message}`);
      throw error;
    }
  }
}
