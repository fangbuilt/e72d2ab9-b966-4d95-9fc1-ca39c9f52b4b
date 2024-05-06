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
import { PositionService } from './position.service';
import { Position } from './entities/position.entity';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { FindAllResponse } from 'src/find-all-response.type';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('position')
@ApiTags('Position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post('new')
  @ApiOperation({ summary: 'Add a new position' })
  @ApiBody({
    type: CreatePositionDto,
    description: 'Position data to be added',
  })
  async create(
    @Body()
    createPositionDto: CreatePositionDto,
  ): Promise<Position> {
    return this.positionService.create(createPositionDto);
  }

  @Get('all')
  @ApiOperation({
    summary: 'Retrieve all positions data with optional pagination and search',
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
  ): Promise<FindAllResponse<Position>> {
    return this.positionService.findAll(
      page,
      perPage,
      sortBy,
      sortOrder,
      keyword,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific position data by ID' })
  async findOne(
    @Param('id')
    id: string,
  ): Promise<Position> {
    return this.positionService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a position data by ID' })
  @ApiBody({
    type: UpdatePositionDto,
    description: 'Position data to be updated',
  })
  async update(
    @Param('id')
    id: string,
    @Body()
    updatePositionDto: UpdatePositionDto,
  ): Promise<Position> {
    return this.positionService.update(id, updatePositionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a position data by ID' })
  async remove(@Param('id') id: string): Promise<Position> {
    return this.positionService.remove(id);
  }
}
