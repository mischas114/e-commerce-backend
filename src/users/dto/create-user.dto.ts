import { ApiProperty } from '@nestjs/swagger';
import {
	IsAlphanumeric,
	IsEmail,
	IsHash,
	IsNumber,
	MaxLength,
	MinLength,
} from 'class-validator';

export class CreateUserDto {
	@ApiProperty()
	@IsAlphanumeric()
	@MaxLength(10)
	firstName: string;

	@ApiProperty()
	@IsAlphanumeric()
	@MaxLength(10)
	secondName: string;

	@ApiProperty({ required: false })
	@IsNumber()
	age?: number;

	@ApiProperty()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsHash('sha256')
	password: string;

	@ApiProperty()
	@IsAlphanumeric()
	@MaxLength(10)
	permissions: string;
}
