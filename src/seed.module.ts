import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Position, PositionSchema } from './position/entities/position.entity';
import { Employee, EmployeeSchema } from './employee/entities/employee.entity';
import { PositionModule } from './position/position.module';
import { EmployeeModule } from './employee/employee.module';
import { PositionSeedService } from './position/position.seed.service';
import { PositionSeedController } from './position/position.seed.controller';
import { EmployeeSeedService } from './employee/employee.seed.service';
import { EmployeeSeedController } from './employee/employee.seed.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Position.name, schema: PositionSchema },
      { name: Employee.name, schema: EmployeeSchema },
    ]),
    PositionModule,
    EmployeeModule,
  ],
  controllers: [PositionSeedController, EmployeeSeedController],
  providers: [PositionSeedService, EmployeeSeedService],
})
export class SeedModule {}
