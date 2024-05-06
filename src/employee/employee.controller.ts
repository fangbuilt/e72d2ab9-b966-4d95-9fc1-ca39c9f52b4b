import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { FindAllResponse } from 'src/find-all-response.type';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('employee')
@ApiTags('Employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('new')
  @ApiOperation({ summary: 'Add a new employee data' })
  @ApiBody({
    type: CreateEmployeeDto,
    description: 'Employee data to be added',
  })
  async create(
    @Body()
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get('all')
  @ApiOperation({
    summary: 'Retrieve all employees data with optional pagination and search',
  })
  @ApiQuery({ name: 'page', type: 'number', required: false })
  @ApiQuery({ name: 'perPage', type: 'number', required: false })
  @ApiQuery({ name: 'sortBy', type: 'string', required: false })
  @ApiQuery({ name: 'sortOrder', type: 'string', required: false })
  @ApiQuery({ name: 'keyword', type: 'string', required: false })
  async findAll(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('sortBy') sortBy: string,
    @Query('sortOrder') sortOrder: string,
    @Query('keyword') keyword: string = '',
  ): Promise<FindAllResponse<Employee>> {
    return this.employeeService.findAll(
      page,
      perPage,
      sortBy,
      sortOrder,
      keyword,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific employee data by ID' })
  async findOne(
    @Param('id')
    id: string,
  ): Promise<Employee> {
    return this.employeeService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an employee data by ID' })
  @ApiBody({
    type: UpdateEmployeeDto,
    description: 'Employee data to be updated',
  })
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an employee data by ID' })
  async remove(@Param('id') id: string): Promise<Employee> {
    return this.employeeService.remove(id);
  }
}
