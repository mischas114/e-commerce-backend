import { ApiProperty } from '@nestjs/swagger';
import {
	IsAlphanumeric,
	IsEmail,
	IsIn,
	IsNumber,
	IsOptional,
	IsPositive,
	MaxLength,
} from 'class-validator';

export class CreateUserDto {
	@IsAlphanumeric()
	@MaxLength(50)
	@ApiProperty({
		example: 'John',
		description: 'First name of the user',
		type: String,
	})
	firstName: string;

	@IsAlphanumeric()
	@MaxLength(50)
	@ApiProperty({
		example: 'Doe',
		description: 'Last name of the user',
		type: String,
	})
	secondName: string;

	@IsOptional()
	@IsNumber()
	@IsPositive()
	@ApiProperty({
		example: 25,
		description: 'Age of the user',
		required: false,
		type: Number,
	})
	age?: number;

	@IsEmail()
	@MaxLength(50)
	@ApiProperty({
		example: 'john.doe@example.com',
		description: 'Email address of the user',
		type: String,
	})
	email: string;

	@ApiProperty({
		example: 'SecurePassword123!',
		description: 'a very secure password',
		type: String,
	})
	password: string;

	@IsIn(['Premium', 'Standard', 'Admin'])
	@IsAlphanumeric()
	@MaxLength(20)
	@ApiProperty({
		example: 'Premium',
		description: 'Premium | Standard | Admin',
		type: String,
	})
	permissions: string;
}
