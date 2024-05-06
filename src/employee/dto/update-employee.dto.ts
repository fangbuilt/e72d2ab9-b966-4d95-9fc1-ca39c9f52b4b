import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'John',
    type: 'string',
    description: 'First name of the employee, can NOT be empty',
    minLength: 2,
    maxLength: 24,
  })
  readonly firstName?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Doe',
    type: 'string',
    description: 'Last name of the employee, can NOT be empty',
    minLength: 2,
    maxLength: 24,
  })
  readonly lastName?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '66385db0af5435a57050dfca',
    type: 'string',
    description:
      'ID of the position, get the position ID then paste it here. Position ID must be valid and can NOT be empty',
  })
  readonly position?: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  @ApiProperty({
    example: '+6391234567890',
    type: 'string',
    description:
      'Phone number of the employee. Phone number must be valid (using country code) and can NOT be empty',
    minLength: 10,
    maxLength: 15,
  })
  readonly phone?: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'john.doe@example.com',
    type: 'string',
    description:
      'Email of the employee. Email must be valid (using @ and suffix) and can NOT be empty',
    maxLength: 64,
  })
  readonly email?: string;
}
