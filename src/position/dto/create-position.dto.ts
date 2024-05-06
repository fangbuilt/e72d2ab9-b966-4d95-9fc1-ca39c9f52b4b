import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePositionDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Software Engineer',
    type: 'string',
    description: 'Title of the position, can NOT be empty',
    minLength: 2,
    maxLength: 64,
  })
  readonly title: string;
}
