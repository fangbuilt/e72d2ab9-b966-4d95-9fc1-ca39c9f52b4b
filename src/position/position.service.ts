import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
// import { CreatePositionDto } from './dto/create-position.dto';
// import { UpdatePositionDto } from './dto/update-position.dto';
import { Position } from './entities/position.entity';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { FindAllResponse } from 'src/find-all-response.type';

@Injectable()
export class PositionService {
  constructor(
    @InjectModel(Position.name)
    private positionModel: Model<Position>,
  ) {}

  async create(createPositionDto: CreatePositionDto): Promise<Position> {
    const newPosition = await this.positionModel.create(createPositionDto);
    return newPosition;
  }

  async findAll(
    page = 1,
    perPage = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    keyword = '',
  ): Promise<FindAllResponse<Position>> {
    const searchQuery = keyword
      ? { title: { $regex: new RegExp(keyword, 'i') } }
      : {};
    const sortOptions: Record<string, 'asc' | 'desc'> = {
      [sortBy]: sortOrder as 'asc' | 'desc',
    };

    const positions = await this.positionModel
      .find(searchQuery)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort(sortOptions)
      .exec();

    const totalCount = await this.positionModel
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
    return { data: positions, metadata };
  }

  async findOne(id: string): Promise<Position> {
    const isValidObjectId = mongoose.isValidObjectId(id);
    if (!isValidObjectId) {
      throw new BadRequestException('Invalid object id');
    }
    const position = await this.positionModel.findById(id);
    if (!position) {
      throw new NotFoundException('Position not found.');
    }
    return position;
  }

  async update(
    id: string,
    updatePositionDto: UpdatePositionDto,
  ): Promise<Position> {
    const position = await this.positionModel.findByIdAndUpdate(
      id,
      updatePositionDto,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!position) {
      throw new NotFoundException('Position not found.');
    }
    return position;
  }

  async remove(id: string): Promise<Position> {
    return await this.positionModel.findByIdAndDelete(id);
  }
}
