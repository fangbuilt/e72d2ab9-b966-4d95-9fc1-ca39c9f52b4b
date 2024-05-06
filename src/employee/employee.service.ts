import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './entities/employee.entity';
import mongoose, { Model } from 'mongoose';
import { FindAllResponse } from 'src/find-all-response.type';
import { Position } from 'src/position/entities/position.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private employeeModel: Model<Employee>,
    @InjectModel(Position.name)
    private positionModel: Model<Position>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const position = await this.positionModel.findById(
      createEmployeeDto.position,
    );
    if (!position) {
      throw new NotFoundException('Position not found.');
    }
    const newEmployee = await this.employeeModel.create({
      ...createEmployeeDto,
      position: position._id,
    });
    return newEmployee.populate('position');
  }

  async findAll(
    page = 1,
    perPage = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    keyword = '',
  ): Promise<FindAllResponse<Employee>> {
    const searchQuery = keyword
      ? { title: { $regex: new RegExp(keyword, 'i') } }
      : {};
    const sortOptions: Record<string, 'asc' | 'desc'> = {
      [sortBy]: sortOrder as 'asc' | 'desc',
    };

    const employees = await this.employeeModel
      .find(searchQuery)
      .skip(perPage * (page - 1))
      .limit(perPage)
      .sort(sortOptions)
      .populate('position')
      .exec();

    const totalCount = await this.employeeModel
      .countDocuments(searchQuery)
      .exec();

    const pageCount = Math.ceil(totalCount / perPage);

    const metadata = {
      totalCount,
      pageCount,
      page,
      perPage,
      sortBy,
      sortOrder,
      keyword,
    };
    return { data: employees, metadata };
  }

  async findOne(id: string): Promise<Employee> {
    const isValidObjectId = mongoose.isValidObjectId(id);
    if (!isValidObjectId) {
      throw new BadRequestException('Invalid object id');
    }
    const employee = await this.employeeModel
      .findById(id)
      .populate('position')
      .exec();
    if (!employee) {
      throw new NotFoundException('Employee not found.');
    }
    return employee;
  }

  async update(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    const position = await this.positionModel.findById(
      updateEmployeeDto.position,
    );
    if (updateEmployeeDto.position && !position) {
      throw new NotFoundException('Position not found.');
    }
    const employee = await this.employeeModel
      .findByIdAndUpdate(
        id,
        { ...updateEmployeeDto, position: position?._id },
        {
          new: true,
          runValidators: true,
        },
      )
      .populate('position')
      .exec();
    if (!employee) {
      throw new NotFoundException('Employee not found.');
    }
    return employee;
  }

  async remove(id: string): Promise<Employee> {
    return await this.employeeModel.findByIdAndDelete(id);
  }
}
