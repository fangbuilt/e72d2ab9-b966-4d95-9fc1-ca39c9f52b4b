import { PartialType } from '@nestjs/mapped-types';
import { CreatePositionDto } from './create-position.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePositionDto extends PartialType(CreatePositionDto) {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Software Engineer',
    type: 'string',
    description: 'Title of the position, can NOT be empty',
    minLength: 2,
    maxLength: 64,
  })
  readonly title?: string;
}
